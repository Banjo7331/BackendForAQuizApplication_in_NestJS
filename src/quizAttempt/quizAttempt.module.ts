import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizAttemptResolver } from "./QuizAttemptResolver";
import { QuizAttemptService } from "./quizAttempt.service";
import { QuizAttempt } from "../typeorm/entities/QuizAttempt";
import { UserAnswer } from "../typeorm/entities/UserQuestionAnswerInput";
import { Quiz } from "../typeorm/entities/Quiz";
import { Question } from "../typeorm/entities/Question";

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAttempt,UserAnswer,Quiz,Question])
    ],
    exports: [],
    providers: [QuizAttemptResolver,QuizAttemptService],

})
export class QuizAttemptModule{

}