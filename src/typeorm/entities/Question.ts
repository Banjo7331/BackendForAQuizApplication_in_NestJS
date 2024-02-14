import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./Quiz";

@Entity({name: 'question'})
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    @ManyToOne(() => Quiz,(quiz) => quiz.posts)
    quiz: Quiz;

}