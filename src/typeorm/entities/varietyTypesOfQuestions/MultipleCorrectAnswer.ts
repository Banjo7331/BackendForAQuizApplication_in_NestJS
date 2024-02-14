import { Field, ObjectType } from "@nestjs/graphql";
import { Question } from "../Question";

@ObjectType({ implements: Question })
export class MultipleChoiceQuestion extends Question {
  @Field((type) => [String])
  options: string[];
}