import { Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/typeorm/entities/Quiz";
import { Repository } from "typeorm";
import { CreateQuizInput } from "./utils/CreateQuizInput";
import { Question } from "src/typeorm/entities/Question";
import { QuizNotFoundException } from "src/exceptions/QuizNotFound.exception";
import { QuestionNotFoundException } from "src/exceptions/QuestionNotFound.exception";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,

    ){
        
    }
    async getQuizQuestions(id: number) {
      const quiz = await this.quizRepository.findOne({ where: { id }, relations: ['questions'] });
      if (!quiz) {
        throw new QuizNotFoundException();
      }
  
      return quiz.questions;
    }
    async createQuiz(createQuizData: CreateQuizInput): Promise<Quiz> {
      const { name, questions } = createQuizData;
    
      const quiz = new Quiz();
      quiz.name = name;
    
      const createdQuiz = await this.quizRepository.save(quiz);
    
      if (questions && questions.length > 0) {
        const questionEntities = questions.map((questionData) => {
          return this.questionRepository.create({
            ...questionData,
            quiz: createdQuiz,
          });
        });
    
        await this.questionRepository.save(questionEntities);

        createdQuiz.questions = questionEntities;
      }else{
        throw new QuestionNotFoundException()
      }
    
      return createdQuiz;
    }
    
}