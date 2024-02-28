import { Resolver,  Mutation, Args } from '@nestjs/graphql';
import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptInput } from './utils/CreateQuestionAttemptInput';
import { QuizAttempt } from '../typeorm/entities/QuizAttempt';

@Resolver(() => QuizAttempt)
export class QuizAttemptResolver {
    constructor(@Inject(QuizAttemptService) private quizAttemptService: QuizAttemptService,){}
    
    @Mutation((returns) => QuizAttempt)
    @UsePipes(new ValidationPipe())
    submitAnswers(@Args('createQuizAttemptData') createQuizAttemptData: CreateQuizAttemptInput){
        return this.quizAttemptService.submitAnswers(createQuizAttemptData);
    } 

}