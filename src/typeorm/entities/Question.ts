import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./Quiz";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({name: 'question'})
@ObjectType()
export class Question{
    @Field((type) => Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    type: string;

    @Field((type) => [String], { nullable: true })
    @Column('jsonb', { nullable: true })
    possibleAnswers?: string[];

    @Field((type) => [String])
    @Column('jsonb')
    correctAnswer: string[];

    @Field()
    @Column()
    description: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

}