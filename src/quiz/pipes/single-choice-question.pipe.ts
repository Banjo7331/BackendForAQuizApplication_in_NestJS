import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { QuestionType } from 'src/enums/question-type.enum';

@Injectable()
export class SingleChoiceValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && metadata.metatype) {
      const { questions } = value;

      if (questions && Array.isArray(questions)) {
        
        const invalidQuestions = questions.filter((question) => {
            if (!question.possibleAnswers) {
              throw new BadRequestException('Possible answers must be defined for single-choice questions.');
            }
            return (
              question.type === QuestionType.ONE_CHOICE && question.correctAnswer.length !== 1
            );
        });

        if (invalidQuestions.length > 0) {
          throw new BadRequestException(
            `Invalid correctAnswers length for single-choice questions. Each single-choice question should have exactly one correct answer.`
          );
        }
      }
    }

    return value;
  }
}