import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuestionInput } from "./CreateQuestionInput";

@InputType()
export class CreateQuizInput {
  @Field()
  name: string;

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];
}