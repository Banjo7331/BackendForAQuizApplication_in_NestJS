import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateQuestionInput {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  description: string;

  @Field(() => [String])
  possibleAnswers: string[];

  @Field()
  correctAnswer: string;
}