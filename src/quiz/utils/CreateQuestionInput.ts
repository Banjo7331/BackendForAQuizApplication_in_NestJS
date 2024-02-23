import { Field, InputType } from "@nestjs/graphql";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateQuestionInput {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  @Field()
  title: string;

  @IsString({ message: 'Type must be a string.' })
  @IsNotEmpty({ message: 'Type cannot be empty.' })
  @Field()
  type: string;

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

  @IsString({ message: 'Correct answer must be a string.' })
  @IsNotEmpty({ message: 'Correct answer cannot be empty.' })
  @Field()
  correctAnswer: string;
}