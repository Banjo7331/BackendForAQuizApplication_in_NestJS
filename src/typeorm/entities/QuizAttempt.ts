import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAnswer } from "./UserQuestionAnswerInput";
import { Quiz } from "./Quiz";

@Entity({name: 'quiz_attempt'})
@ObjectType()
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Quiz, { eager: true })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  @Field((type) => Int)
  maxPoints: number;

  @Column()
  @Field((type) => Int)
  obtainedPoints: number;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt, { eager: true })
  @Field(() => [UserAnswer], { nullable: true }) 
  userAnswers?: UserAnswer[];
}