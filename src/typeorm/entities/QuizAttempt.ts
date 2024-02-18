import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAnswer } from "./UserQuestionAnswerInput";

@Entity({name: 'quiz_attempt'})
@ObjectType()
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => Int)
  quizId: number;

  @Column()
  @Field((type) => Int)
  maxPoints: number;

  @Column()
  @Field((type) => Int)
  obtainedPoints: number;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt)
  @Field(() => [UserAnswer], { nullable: true }) 
  userAnswers?: UserAnswer[];
}