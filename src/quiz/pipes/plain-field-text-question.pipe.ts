import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { QuestionType } from '../../enums/question-type.enum';

@Injectable()
export class PlainTextAnswerValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && metadata.metatype) {
      const { questions } = value;

      if (questions && Array.isArray(questions)) {
        const invalidQuestions = questions.filter(
          (question) => {
            if (question.possibleAnswers && question.type === QuestionType.PLAIN_FIELD) {
              throw new BadRequestException('Possible answers must not be defined for plain-text-answer questions.');
            }

            if (!question.correctAnswer) {
              throw new BadRequestException('Correct answer must be defined for plain-text-answer questions.');
            }

            return (
              question.type === QuestionType.PLAIN_FIELD &&
              question.correctAnswer.length !== 1
            );
          }
        );

        if (invalidQuestions.length > 0) {
          throw new BadRequestException(
            `Invalid correctAnswer for plain-text-answer questions. The correctAnswer array should have exactly one element, and possibleAnswers should not be defined.`
          );
        }
      }
    }

    return value;
  }
}