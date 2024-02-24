import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { QuestionNotFoundException } from 'src/exceptions/QuestionNotFound.exception';
import { QuizNotFoundException } from 'src/exceptions/QuizNotFound.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ExecutionContext) {
        const ctx = GqlExecutionContext.create(host);
        const response = ctx.getContext().res;
    
        if (exception instanceof BadRequestException) {
            response.status(HttpStatus.BAD_REQUEST).json({
              statusCode: HttpStatus.BAD_REQUEST,
              message: exception.message,
            });
        } else if (exception instanceof HttpException) {
            const status = exception.getStatus();
            response.status(status).json({
              statusCode: status,
              message: exception.message,
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
            });
        }
      }
}