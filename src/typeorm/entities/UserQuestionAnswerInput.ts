import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { QuizAttempt } from "./QuizAttempt";

@Entity({name: 'user_input'})
@ObjectType()
export class UserAnswer{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;
    @OneToOne(()=> Question)
    @Column()
    @Field((type) => Int)
    questionId: number;

    @Column()
    @Field((type) => Int)
    quizAttemptId: number;

    @Column()
    @Field()
    answer?: string;
    
    @ManyToOne(() => QuizAttempt,(quizAttempt) => quizAttempt.userAnswers)
    quizAttempt: QuizAttempt;
}