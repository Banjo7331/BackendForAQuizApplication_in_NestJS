import { Resolver, Query, Mutation, Args, Int,ResolveField, Parent } from '@nestjs/graphql';
import { Quiz } from 'src/typeorm/entities/Quiz';
import { QuizService } from './quiz.service';
import { Inject } from '@nestjs/common';
import { CreateQuizInput } from './utils/CreateQuizInput';
import { Question } from 'src/typeorm/entities/Question';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(@Inject(QuizService) private quizService: QuizService){}
    @Query((returns) => Quiz, {nullable: true})
    getQuizQuestions(@Args('id',{type: ()=> Int}) id: number) {
      return this.quizService.getQuizQuestions(id);
  
    }

    @Mutation((returns) => Quiz)
    createQuiz(@Args('createQuizData') createQuizData: CreateQuizInput): Promise<Quiz> {
    return this.quizService.createQuiz(createQuizData);
  }

}