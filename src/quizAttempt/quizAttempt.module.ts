import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizAttemptResolver } from "./QuizAttemptResolver";
import { QuizAttemptService } from "./quizAttempt.service";
import { QuizAttempt } from "src/typeorm/entities/QuizAttempt";
import { UserAnswer } from "src/typeorm/entities/UserQuestionAnswerInput";
import { Quiz } from "src/typeorm/entities/Quiz";
import { Question } from "src/typeorm/entities/Question";

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAttempt,UserAnswer,Quiz,Question])
    ],
    exports: [],
    providers: [QuizAttemptResolver,QuizAttemptService],

})
export class QuizAttemptModule{

}