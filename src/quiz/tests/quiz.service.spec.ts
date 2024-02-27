import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizService } from '../quiz.service';
import { Quiz } from '../../typeorm/entities/Quiz';
import { Question } from '../../typeorm/entities/Question';
import { CreateQuizInput } from '../utils/CreateQuizInput';
import { QuizNotFoundException } from '../../exceptions/QuizNotFound.exception';

describe('QuizService', () => {
  let service: QuizService;
  let quizRepositoryMock: Repository<Quiz>;
  let questionRepositoryMock: Repository<Question>;

  beforeEach(async () => {
    quizRepositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Quiz>;

    questionRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Question>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: quizRepositoryMock,
        },
        {
          provide: getRepositoryToken(Question),
          useValue: questionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  describe('createQuiz', () => {
    it('should create a quiz with question', async () => {
      const createQuizData: CreateQuizInput = {
        name: 'My Quiz',
        questions: [
          { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
        ],
      };

      const mockQuiz = new Quiz();
      const mockQuestions = [new Question(), new Question()];

      quizRepositoryMock.save = jest.fn().mockResolvedValue(mockQuiz);
      questionRepositoryMock.create = jest.fn().mockReturnValue(mockQuestions[0]);

      const result = await service.createQuiz(createQuizData);

      expect(result).toEqual(mockQuiz);
      expect(quizRepositoryMock.save).toHaveBeenCalledWith(expect.any(Quiz));
      expect(questionRepositoryMock.create).toHaveBeenCalledTimes(createQuizData.questions.length);
      expect(questionRepositoryMock.save).toHaveBeenCalledWith(expect.arrayContaining(mockQuestions));
    });
    it('should create a quiz with 100 questions', async () => {
      const numberOfQuestions = 100;
      const createQuizData: CreateQuizInput = {
        name: 'My Quiz',
        questions: Array.from({ length: numberOfQuestions }, (_, index) => ({
          title: `Question ${index + 1}`,
          description: 'agaaa',
          type: 'single-correct-answer',
          possibleAnswers: ['2', 's'],
          correctAnswer: ['A'],
        })),
      };
  
      const mockQuiz = new Quiz();
      const mockQuestions = Array.from({ length: numberOfQuestions }, () => new Question());
  
      quizRepositoryMock.save = jest.fn().mockResolvedValue(mockQuiz);
      questionRepositoryMock.create = jest.fn().mockReturnValueOnce(mockQuestions[0])
                                                   .mockReturnValueOnce(mockQuestions[1])
                                                   .mockReturnValueOnce(mockQuestions[2])
  
      const result = await service.createQuiz(createQuizData);
  
      expect(result).toEqual(mockQuiz);
      expect(quizRepositoryMock.save).toHaveBeenCalledWith(expect.any(Quiz));
      expect(questionRepositoryMock.create).toHaveBeenCalledTimes(numberOfQuestions);
      expect(questionRepositoryMock.save).toHaveBeenCalledWith(expect.arrayContaining(mockQuestions));
    });
  });
  describe('getQuizQuestions', () => {
    it('should return quiz questions when quiz is found', async () => {
      const quizId = 1;
      const mockQuiz = {
        id: quizId,
        name: 'Sample Quiz',
        questions: [
          { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
        ],
      };
  
      quizRepositoryMock.findOne = jest.fn().mockResolvedValue(mockQuiz);
  
      const result = await service.getQuizQuestions(quizId);
  
      expect(result).toEqual(mockQuiz.questions);
      expect(quizRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: quizId }, relations: ['questions'] });
    });
  
    it('should throw QuizNotFoundException when quiz is not found', async () => {
      const quizId = 1;
  
      quizRepositoryMock.findOne = jest.fn().mockResolvedValue(null);
  
      await expect(async () => {
        await service.getQuizQuestions(quizId);
      }).rejects.toThrow(QuizNotFoundException);
  
      expect(quizRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: quizId }, relations: ['questions'] });
    });
  });
});