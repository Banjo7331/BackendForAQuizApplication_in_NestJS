
import { QuizAttemptService } from "../quizAttempt.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateQuizAttemptInput } from "../utils/CreateQuestionAttemptInput";
import { Repository } from "typeorm";
import { Question } from "../../typeorm/entities/Question";
import { Quiz } from "../../typeorm/entities/Quiz";
import { QuizAttempt } from "../../typeorm/entities/QuizAttempt";
import { UserAnswer } from "../../typeorm/entities/UserQuestionAnswerInput";
import { getRepositoryToken } from "@nestjs/typeorm";
import { QuizNotFoundException } from "../../exceptions/QuizNotFound.exception";
import { QuestionNotFoundException } from "../../exceptions/QuestionNotFound.exception";
import { CreateQuizInput } from "../../quiz/utils/CreateQuizInput";

describe('QuizAttemptService', () => {
    let service: QuizAttemptService;
    let quizAttemptRepositoryMock: Repository<QuizAttempt>;
    let userAnswerRepositoryMock: Repository<UserAnswer>;
    let quizRepositoryMock: Repository<Quiz>;
  
    beforeEach(async () => {
        quizAttemptRepositoryMock = {
          save: jest.fn(),
        } as unknown as Repository<QuizAttempt>;
    
        userAnswerRepositoryMock = {
          save: jest.fn(),
        } as unknown as Repository<UserAnswer>;
    
        quizRepositoryMock = {
            findOne: jest.fn(),
            save: jest.fn(),
        } as unknown as Repository<Quiz>;
    
    
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            QuizAttemptService,
            {
              provide: getRepositoryToken(QuizAttempt),
              useValue: quizAttemptRepositoryMock,
            },
            {
              provide: getRepositoryToken(UserAnswer),
              useValue: userAnswerRepositoryMock,
            },
            {
              provide: getRepositoryToken(Quiz),
              useValue: quizRepositoryMock,
            },
          ],
        }).compile();
  
      service = module.get<QuizAttemptService>(QuizAttemptService);
    });
  
    describe('submitAnswers', () => {
      it('should submit answers for a quiz attempt', async () => {
        
        const createQuizData: CreateQuizInput = {
            name: 'My Quiz',
            questions: [
              { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
            ],
        };

        const mockQuizAttemptt = new QuizAttempt();
        const mockUserAnswers = [new UserAnswer(), new UserAnswer()];


        quizRepositoryMock.findOne = jest.fn().mockResolvedValue({
            id: 1,
            name: 'Sample Quiz',
            questions: [
              { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
            ],
          } as Quiz);

        const mockQuizAttempt: CreateQuizAttemptInput = {
            quizId: 1,
            userAnswers: [] as UserAnswer[], 
        };

        quizAttemptRepositoryMock.save = jest.fn().mockResolvedValue(mockQuizAttemptt);

        userAnswerRepositoryMock.save = jest.fn().mockResolvedValue(mockUserAnswers[0]);
        

        const expectedQuizAttempt: QuizAttempt = {
            id: 1,
            quiz: { id: 1, name: 'Sample Quiz', questions: [] } as Quiz,
            maxPoints: 1,
            obtainedPoints: 0,
            userAnswers: [] as UserAnswer[], 
        };
        

        const result = await service.submitAnswers(mockQuizAttempt);
        
        expect(result).toEqual({
            obtainedPoints: 0,
            userAnswers: [],
        });
        expect(quizRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['questions'] });
      });
  
      it('should throw QuizNotFoundException when question is not found', async () => {
        const quizId = 1;
        const userAnswers = [{ answer: ['A'] }];
  
        quizAttemptRepositoryMock.findOne = jest.fn().mockResolvedValue(null);
  
        await expect(async () => {
            await service.submitAnswers({ quizId, userAnswers });
        }).rejects.toThrow(QuizNotFoundException);
      });

      it('should throw QuestionNotFoundException when question is not found', async () => {
        const quizId = 1;
        const userAnswers = [{ answer: ['A'] }];
        const questionIndex = 0; 
      
        quizAttemptRepositoryMock.findOne = jest.fn().mockResolvedValue(new QuizAttempt());
      
        const questionsMock = Array.from({ length: questionIndex + 1 }, (_, index) => {
          if (index === questionIndex) {
            return null;
          }
          return new Question();
        });
        
        quizRepositoryMock.findOne = jest.fn().mockResolvedValue({ questions: questionsMock } as Quiz);
      
        await expect(async () => {
          await service.submitAnswers({ quizId, userAnswers });
        }).rejects.toThrow(QuestionNotFoundException);
      });
  
    });
  });