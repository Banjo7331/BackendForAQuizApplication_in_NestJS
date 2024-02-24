import { Resolver, Query, Mutation, Args, Int,ResolveField, Parent } from '@nestjs/graphql';
import { Quiz } from 'src/typeorm/entities/Quiz';
import { Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptInput } from './utils/CreateQuestionAttemptInput';
import { QuizAttempt } from 'src/typeorm/entities/QuizAttempt';
import { GlobalExceptionFilter } from 'src/filters/GeneralException.filter';
import { QuizExceptionFilter } from 'src/filters/QuizCreatingException.filter';

@Resolver(() => QuizAttempt)
export class QuizAttemptResolver {
    constructor(@Inject(QuizAttemptService) private quizAttemptService: QuizAttemptService,){}
    
    @Mutation((returns) => QuizAttempt)
    @UsePipes(new ValidationPipe())
    @UseFilters(QuizExceptionFilter,GlobalExceptionFilter)
    submitAnswers(@Args('createQuizAttemptData') createQuizAttemptData: CreateQuizAttemptInput){
        return this.quizAttemptService.submitAnswers(createQuizAttemptData);
    } 

}