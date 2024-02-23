import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuizAttemptInput } from "./CreateQuestionAttemptInput";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserAttemptInput{
    @IsString({message: "Answer must be a string."})
    @IsNotEmpty({message:"Answer cannot be empty."})
    @Field()
    answer?: string;

}