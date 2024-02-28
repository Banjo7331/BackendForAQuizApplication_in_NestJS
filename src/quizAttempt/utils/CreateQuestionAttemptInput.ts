import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateUserAttemptInput } from "./CreateUserAnswerInput";
import { ArrayMinSize, IsArray, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateQuizAttemptInput {
  @Min(1, { message: 'Quiz ID must be greater than or equal to 1.' })
  @Field((type) => Int)
  quizId: number;
  
  @IsArray({ message: 'User answers must be an array.' })
  @ArrayMinSize(1, { message: 'There must be at least one user answer.' })
  @ValidateNested({ each: true }) 
  @Type(() => CreateUserAttemptInput)
  @Field(() => [CreateUserAttemptInput]) 
  userAnswers: CreateUserAttemptInput[];
}


  