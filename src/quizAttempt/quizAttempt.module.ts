import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizAttemptResolver } from "./QuizAttemptResolver";
import { QuizAttemptService } from "./quizAttempt.service";
import { QuizAttempt } from "src/typeorm/entities/QuizAttempt";
import { UserAnswer } from "src/typeorm/entities/UserQuestionAnswerInput";

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAttempt,UserAnswer])
    ],
    exports: [],
    providers: [QuizAttemptResolver,QuizAttemptService],

})
export class QuizAttemptModule{

}