import { Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/typeorm/entities/Quiz";
import { Repository } from "typeorm";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,

    ){
        
    }
    async getQuizQuestions(id: number) {
        const quiz = await this.quizRepository.findOneBy({id});
        if (!quiz) {
          throw new Error(`Quiz with ID ${id} not found`);
        }
    
        return quiz;
      }
}