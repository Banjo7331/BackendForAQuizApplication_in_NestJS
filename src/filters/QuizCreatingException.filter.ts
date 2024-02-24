
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, ExecutionContext } from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext, GqlContextType } from '@nestjs/graphql';
import { QuestionNotFoundException } from 'src/exceptions/QuestionNotFound.exception';
import { QuizNotFoundException } from 'src/exceptions/QuizNotFound.exception';

@Catch()
export class QuizExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ExecutionContext) {
    const ctx = GqlExecutionContext.create(host);
    const response = ctx.getContext().res;

    if (exception instanceof QuizNotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Quiz not found in the database',
      });
    } else if (exception instanceof QuestionNotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Question not found in the database',
      });
    }
  }
}