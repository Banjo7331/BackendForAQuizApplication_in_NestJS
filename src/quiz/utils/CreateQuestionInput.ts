import { Field, InputType } from "@nestjs/graphql";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

@InputType()
export class CreateQuestionInput {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  @Length(3, 25, { message: `Title for Question must be between $constraint1 and $constraint2 characters.` })
  @Field()
  title: string;

  @IsString({ message: 'Type must be a string.' })
  @IsNotEmpty({ message: 'Type cannot be empty.' })
  @Field()
  type: string;
  
  @Length(5, 45, { message: `Description of Question must be between $constraint1 and $constraint2 characters.` })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description cannot be empty.' })
  @Field()
  description: string;
  
  @IsOptional()
  @IsArray({ message: 'Possible answers must be an array.' })
  @ArrayMinSize(1, { message: 'There must be at least one possible answer.' })
  @ArrayMaxSize(5, { message: 'There cannot be more than five possible answers.' })
  @Field(() => [String], { nullable: true })
  possibleAnswers?: string[];

  @ArrayMinSize(1, { message: 'There must be at least one possible answer.' })
  @ArrayMaxSize(5, { message: 'There cannot be more than five possible answers.' })
  @IsArray({ message: 'Correct answers must be an array.' })
  @IsNotEmpty({ message: 'Correct answer cannot be empty.' })
  @Field(() => [String])
  correctAnswer: string[];
}