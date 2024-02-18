import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizAttempt } from "src/typeorm/entities/QuizAttempt";
import { UserAnswer } from "src/typeorm/entities/UserQuestionAnswerInput";
import { Repository } from "typeorm";
import { CreateQuizAttemptInput } from "./utils/CreateQuestionAttemptInput";
import { Quiz } from "src/typeorm/entities/Quiz";
import { Question } from "src/typeorm/entities/Question";

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectRepository(QuizAttempt) private quizAttemptRepository: Repository<QuizAttempt>,
    @InjectRepository(UserAnswer) private userAnswerRepository: Repository<UserAnswer>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(Question) private questionRepository: Repository<Question>,
  ) {}

  async submitAnswers(createQuizAttemptData: CreateQuizAttemptInput): Promise<QuizAttempt> {
    const { quizId, userAnswers } = createQuizAttemptData;
    
    const id = quizId;
    const quiz = await this.quizRepository.findOneBy({id});
    if (!quiz) {
        throw new Error(`Quiz with ID ${quizId} not found`);
    }
    const questions = await this.questionRepository.find({ where: { quizId: quizId } });

    const quizAttempt = new QuizAttempt();
    quizAttempt.quizId = quizId;
    quizAttempt.maxPoints = questions.length;
    

    quizAttempt.obtainedPoints = userAnswers.reduce((points, userAnswer, index) => {
      const question = questions[index];
      if (question && question.correctAnswer === userAnswer.answer) {
          return points + 1;
      }
      return points;
    }, 0);

    const createdQuizAttempt = await this.quizAttemptRepository.save(quizAttempt);

    const userAnswerEntities = userAnswers.map((userAnswer, index) => {
      const userAnswerEntity = new UserAnswer();
      userAnswerEntity.quizAttemptId = createdQuizAttempt.id;
      const question = questions[index];
      if (question) {
          userAnswerEntity.questionId = question.id;
      }
      userAnswerEntity.answer = userAnswer.answer;
      userAnswerEntity.quizAttempt = createdQuizAttempt;
      return userAnswerEntity;
    });
    
    
    await this.userAnswerRepository.save(userAnswerEntities);

    createdQuizAttempt.userAnswers = await this.userAnswerRepository.find({
      where: { quizAttemptId: createdQuizAttempt.id }, 
    });
    return createdQuizAttempt;
  }
}