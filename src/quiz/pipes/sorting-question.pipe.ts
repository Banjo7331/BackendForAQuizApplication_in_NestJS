import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { QuestionType } from '../../enums/question-type.enum';

@Injectable()
export class SortingQuestionValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && metadata.metatype) {
      const { questions } = value;

      if (questions && Array.isArray(questions)) {
        const invalidQuestions = questions.filter(
          (question) => {
            if (!question.possibleAnswers && question.type === QuestionType.SORT) {
              throw new BadRequestException('Possible answers must be defined for sorting-answers questions.');
            }

            return (
              question.type === QuestionType.SORT &&
              question.correctAnswer.length !== question.possibleAnswers.length &&
              !question.correctAnswer.every(answer => question.possibleAnswers.includes(answer))
            );
          }
        );

        if (invalidQuestions.length > 0) {
          throw new BadRequestException(
            `Invalid correctAnswer for sorting-answers questions. The correctAnswer array should have the same length and contain the same string elements as the possibleAnswers array.`
          );
        }
      }
    }
    return value;
  }
}