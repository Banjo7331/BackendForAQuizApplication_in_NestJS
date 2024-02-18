import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuizAttemptInput } from "./CreateQuestionAttemptInput";

@InputType()
export class CreateUserAttemptInput{

    @Field()
    answer?: string;

}