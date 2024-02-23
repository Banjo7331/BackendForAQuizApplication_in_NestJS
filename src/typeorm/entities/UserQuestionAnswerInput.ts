import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { QuizAttempt } from "./QuizAttempt";

@Entity({ name: 'user_input' })
@ObjectType()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'questionId' })
  question: Question; 

  @Column()
  @Field((type) => Int)
  quizAttemptId: number;

  @Column('jsonb')
  @Field((type) => [String])
  answer: string[];

  @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.userAnswers)
  quizAttempt: QuizAttempt;
}