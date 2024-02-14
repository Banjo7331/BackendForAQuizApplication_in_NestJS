import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Quiz } from 'src/typeorm/entities/Quiz';
import { QuizService } from './quiz.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(@Inject(QuizService) private quizService: QuizService){}
    @Query(() => Quiz)
    getQuizQuestions(@Args('id',{type: ()=> Int}) id: number) {
      return this.quizService.getQuizQuestions(id);
  
    }

    @Mutation(() => Quiz)
    async createQuiz() {
        return {};
    }
}