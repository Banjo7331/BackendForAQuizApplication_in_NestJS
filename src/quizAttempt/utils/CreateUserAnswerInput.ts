import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuizAttemptInput } from "./CreateQuestionAttemptInput";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserAttemptInput{
    @ArrayMinSize(1, { message: 'There must be at least one answer.' })
    @ArrayMaxSize(5, { message: 'There cannot be more than five  answers.' })
    @IsArray({ message: 'Answers must be an array.' })
    @IsNotEmpty({message:"Answer cannot be empty."})
    @Field(() => [String])
    answer?: string[];

}