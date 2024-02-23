import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { QuestionType } from 'src/enums/question-type.enum';

@Injectable()
export class MultipleChoiceValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && metadata.metatype) {
      const { questions } = value;

      if (questions && Array.isArray(questions)) {
        const invalidQuestions = questions.filter(
          (question) => {
            if (!question.possibleAnswers) {
              throw new BadRequestException('Possible answers must be defined for multiple-choice questions.');
            }

            return (
              question.type === QuestionType.MULTIPLE_CHOICE &&
              (!question.correctAnswer || 
               question.correctAnswer.length < 1 || 
               question.correctAnswer.length > question.possibleAnswers.length
              )
            );
          }
        );

        if (invalidQuestions.length > 0) {
          throw new BadRequestException(
            `Invalid correctAnswer length for multiple-choice questions. Each multiple-choice question should have at least one but no more than the length of possibleAnswers correct answers.`
          );
        }
      }
    }

    return value;
  }
}