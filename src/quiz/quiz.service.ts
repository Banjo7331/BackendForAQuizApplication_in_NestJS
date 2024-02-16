import { Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/typeorm/entities/Quiz";
import { Repository } from "typeorm";
import { CreateQuizInput } from "./utils/CreateQuizInput";
import { Question } from "src/typeorm/entities/Question";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,

    ){
        
    }
    async getQuizQuestions(id: number) {
      const quiz = await this.quizRepository.findOneBy({id});
      if (!quiz) {
        throw new Error(`Quiz with ID ${id} not found`);
      }
    
      return quiz;
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
    
        // Manually load questions for the created quiz
        createdQuiz.questions = await this.questionRepository.find({
          where: { quiz: { id: createdQuiz.id } },
        });
      }
    
      return createdQuiz;
    }
}