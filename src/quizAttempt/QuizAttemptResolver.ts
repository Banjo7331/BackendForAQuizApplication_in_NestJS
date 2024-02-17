import { Resolver, Query, Mutation, Args, Int,ResolveField, Parent } from '@nestjs/graphql';
import { Quiz } from 'src/typeorm/entities/Quiz';
import { Inject } from '@nestjs/common';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptInput } from './utils/CreateQuestionAttemptInput';
import { QuizAttempt } from 'src/typeorm/entities/QuizAttempt';

@Resolver(() => Quiz)
export class QuizAttemptResolver {
    constructor(@Inject(QuizAttemptService) private quizAttemptService: QuizAttemptService,){}
    
    @Mutation(() => Int)
    submitAnswers(@Args('createQuizAttemptData') createQuizAttemptData: CreateQuizAttemptInput){
        return this.quizAttemptService.submitAnswers(createQuizAttemptData);
    } 

}