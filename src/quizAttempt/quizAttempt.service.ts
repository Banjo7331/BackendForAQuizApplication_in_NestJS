import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizAttempt } from "../typeorm/entities/QuizAttempt";
import { UserAnswer } from "../typeorm/entities/UserQuestionAnswerInput";
import { Repository } from "typeorm";
import { CreateQuizAttemptInput } from "./utils/CreateQuestionAttemptInput";
import { Quiz } from "../typeorm/entities/Quiz";
import { Question } from "../typeorm/entities/Question";
import { QuestionType } from "../enums/question-type.enum";
import { QuestionNotFoundException } from "../exceptions/QuestionNotFound.exception";
import { QuizNotFoundException } from "../exceptions/QuizNotFound.exception";
import { CreateUserAttemptInput } from "./utils/CreateUserAnswerInput";

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectRepository(QuizAttempt) private quizAttemptRepository: Repository<QuizAttempt>,
    @InjectRepository(UserAnswer) private userAnswerRepository: Repository<UserAnswer>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async submitAnswers(createQuizAttemptData: CreateQuizAttemptInput): Promise<QuizAttempt> {
    const { quizId, userAnswers } = createQuizAttemptData;
  
    const quiz = await this.quizRepository.findOne({ where: { id: quizId }, relations: ['questions'] });
    if (!quiz) {
      throw new QuizNotFoundException();
    }
  
    const obtainedPoints = this.calculateObtainedPoints(quiz.questions, userAnswers);
    const createdQuizAttempt = await this.saveQuizAttemptAndUserAnswers(quiz, userAnswers);
  
    return {
      ...createdQuizAttempt,
      obtainedPoints,
    };
  }
  
  private calculateObtainedPoints(questions: Question[], userAnswers: CreateUserAttemptInput[]): number {
    return userAnswers.reduce((points, userAnswer, index) => {
      const question = questions[index];
      if (!question) {
        throw new QuestionNotFoundException(index);
      }
  
      return points + (this.isUserAnswerCorrect(question, userAnswer) ? 1 : 0);
    }, 0);
  }
  
  private isUserAnswerCorrect(question: Question, userAnswer: CreateUserAttemptInput): boolean {
    return (
      question.correctAnswer.length === userAnswer.answer.length &&
      question.correctAnswer.every((correctAnswer, index) =>
        question.type === QuestionType.SORT
          ? correctAnswer === userAnswer.answer[index]
          : userAnswer.answer.includes(correctAnswer)
      )
    );
  }
  
  private async saveQuizAttemptAndUserAnswers(quiz: Quiz, userAnswers: CreateUserAttemptInput[]): Promise<QuizAttempt> {
    const quizAttempt = new QuizAttempt();
    quizAttempt.quiz = quiz;
    quizAttempt.maxPoints = quiz.questions.length;
    quizAttempt.obtainedPoints = this.calculateObtainedPoints(quiz.questions, userAnswers);
  
    const createdQuizAttempt = await this.quizAttemptRepository.save(quizAttempt);
  
    const userAnswerEntities = userAnswers.map((userAnswerInput, index) => {
      const userAnswerEntity = new UserAnswer();
      userAnswerEntity.quizAttempt = createdQuizAttempt;
  
      const question = quiz.questions[index];
      if (!question) {
        throw new QuestionNotFoundException(index);
      }
  
      userAnswerEntity.question = question;
      userAnswerEntity.answer = userAnswerInput.answer;
      return userAnswerEntity;
    });
  
    await this.userAnswerRepository.save(userAnswerEntities);
    console.log('createdQuizAttempt:', createdQuizAttempt);
    createdQuizAttempt.userAnswers = userAnswerEntities;
  
    return createdQuizAttempt;
  }
   
   
}