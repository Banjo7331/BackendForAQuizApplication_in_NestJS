import { Resolver, Query, Mutation, Args, Int,ResolveField, Parent } from '@nestjs/graphql';
import { Quiz } from 'src/typeorm/entities/Quiz';
import { QuizService } from './quiz.service';
import { Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateQuizInput } from './utils/CreateQuizInput';
import { Question } from 'src/typeorm/entities/Question';
import { QuestionTypeValidationPipe } from 'src/quiz/pipes/question-type-validation.pipe';
import { SingleChoiceValidationPipe } from 'src/quiz/pipes/single-choice-question.pipe';
import { MultipleChoiceValidationPipe } from 'src/quiz/pipes/multiple-choice-question.pipe';
import { SortingQuestionValidationPipe } from './pipes/sorting-question.pipe';
import { PlainTextAnswerValidationPipe } from './pipes/plain-field-text-question.pipe';
import { QuizNotFoundException } from 'src/exceptions/QuizNotFound.exception';
import { GlobalExceptionFilter } from 'src/filters/GeneralException.filter';
import { QuizExceptionFilter } from 'src/filters/QuizCreatingException.filter';

@Resolver(() => Quiz)
@UseFilters(QuizExceptionFilter,GlobalExceptionFilter)
export class QuizResolver {
    constructor(@Inject(QuizService) private quizService: QuizService,){}
    @Query((returns) => [Question], {nullable: true})
    getQuizQuestions(@Args('id',{type: ()=> Int}) id: number) {
      const tableOfQuizQuestions = this.quizService.getQuizQuestions(id);
      return tableOfQuizQuestions;
    }

    @Mutation((returns) => Quiz)
    @UsePipes(new ValidationPipe(),
    new QuestionTypeValidationPipe(),
    new SingleChoiceValidationPipe(), 
    new MultipleChoiceValidationPipe(), 
    new SortingQuestionValidationPipe(), 
    new PlainTextAnswerValidationPipe())
    createQuiz(@Args('createQuizData') createQuizData: CreateQuizInput): Promise<Quiz> {
      return this.quizService.createQuiz(createQuizData);
    }

}