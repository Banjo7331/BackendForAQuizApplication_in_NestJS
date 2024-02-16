import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./Quiz";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({name: 'question'})
@ObjectType()
export class Question{
    @Field((type) => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field((type) => Int)
    @PrimaryColumn()
    quizId: number; 
    
    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    type: string;

    @Field((type) => [String], { nullable: true })
    @Column('jsonb', { nullable: true })
    possibleAnswers?: string[];

    @Field()
    @Column() 
    correctAnswer: string;

    @Field()
    @Column()
    description: string;

    @Field((type) => Quiz)
    @ManyToOne(() => Quiz,(quiz) => quiz.questions)
    quiz: Quiz;
}