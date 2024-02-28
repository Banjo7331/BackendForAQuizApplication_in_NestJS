import { plainToClass } from "class-transformer";
import { CreateQuizAttemptInput } from "../utils/CreateQuestionAttemptInput";
import { validate } from "class-validator";

describe('QuizInputValidation', () => {
  
    describe('createQuiz', () => {
      it('should not throw ValidationError as input works fine for validation', async () => {
        const createQuizAttemptData = plainToClass(CreateQuizAttemptInput, {
            quizId: 1,
            userAnswers: [
                { answer: ["A"] },
                { answer: ["B"] },
            ],
        });
        const errors = await validate(createQuizAttemptData);
        expect(errors).toHaveLength(0);
      });
      it('should throw ValidationError as quizId is not a number but a string', async () => {
        const createQuizAttemptData = plainToClass(CreateQuizAttemptInput, {
            quizId: '1',
            userAnswers: [
                { answer: ["A"] },
                { answer: ["B"] },
            ],
        });
        const errors = await validate(createQuizAttemptData);
        expect(errors).toHaveLength(1);
      });
      it('should throw ValidationError as UserAnswers table is empty', async () => {
        const createQuizAttemptData = plainToClass(CreateQuizAttemptInput, {
            quizId: 1,
            userAnswers: [
            ],
        });
        const errors = await validate(createQuizAttemptData);
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError as UserAnswers element has and array length more than 5, and constraints are between 1-5', async () => {
        const createQuizAttemptData = plainToClass(CreateQuizAttemptInput, {
            quizId: 1,
            userAnswers: [
                { answer: ["A","B","C","D","E","F"] },
                { answer: ["B"] },
            ],
        });
        const errors = await validate(createQuizAttemptData);
        expect(errors).toHaveLength(1);
      });
      it('should throw ValidationError as quizId is less than 1, id are only starting from 1', async () => {
        const createQuizAttemptData = plainToClass(CreateQuizAttemptInput, {
            quizId: 0,
            userAnswers: [
                { answer: ["A"] },
                { answer: ["B"] },
            ],
        });
        const errors = await validate(createQuizAttemptData);
        expect(errors).toHaveLength(1);
      });
    });
  });