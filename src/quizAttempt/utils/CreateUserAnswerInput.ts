import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuizAttemptInput } from "./CreateQuestionAttemptInput";

@InputType()
export class CreateUserAttemptInput{
    @Field((type) => Int)
    questionId: number;

    @Field()
    answer?: string;

    @Field(() => CreateQuizAttemptInput)
    quizAttempt: CreateQuizAttemptInput;
}