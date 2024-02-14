import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAnswer } from "./UserQuestionAnswerInput";
import { Quiz } from "./Quiz";

@Entity({ name: 'quiz_attempt' })
@ObjectType()
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @OneToOne(() => Quiz)
  @Column()
  @Field()
  quizId: number;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt)
  @Field(() => [UserAnswer], { nullable: true }) 
  userAnswers?: UserAnswer[];
}