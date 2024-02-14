import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity({name: 'quiz'})
@ObjectType()
export class Quiz{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => Question,(question)=> question.quiz)
    posts: Question[];
}