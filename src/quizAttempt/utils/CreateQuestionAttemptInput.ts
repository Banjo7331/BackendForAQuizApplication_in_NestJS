import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateUserAttemptInput } from "./CreateUserAnswerInput";

@InputType()
export class CreateQuizAttemptInput {
  @Field((type) => Int)
  quizId: number;

  @Field((type) => Int)
  maxPoints: number;

  @Field((type) => Int)
  obtainedPoints: number;

  @Field(() => [CreateUserAttemptInput]) 
  userAnswers: CreateUserAttemptInput[];
}


  