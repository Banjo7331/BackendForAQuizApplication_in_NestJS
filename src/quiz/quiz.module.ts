import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quiz } from "../typeorm/entities/Quiz";
import { Question } from "../typeorm/entities/Question";
import { QuizResolver } from "./QuizResolver";
import { QuizService } from "./quiz.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz,Question])
    ],
    exports: [],
    providers: [QuizResolver,QuizService],

})
export class QuizModule{

}