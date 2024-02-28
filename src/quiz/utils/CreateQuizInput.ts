import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuestionInput } from "./CreateQuestionInput";
import { ArrayMinSize, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateQuizInput {
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 15, { message: `Name for Quiz must be between $constraint1 and $constraint2 characters.` })
  @Field()
  name: string;
  
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'There must be at least one user answer.' })
  @Type(() => CreateQuestionInput)
  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];
}