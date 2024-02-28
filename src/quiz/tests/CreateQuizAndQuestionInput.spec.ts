import { CreateQuizInput } from "../utils/CreateQuizInput";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PlainTextAnswerValidationPipe } from "../pipes/plain-field-text-question.pipe";
import { MultipleChoiceValidationPipe } from "../pipes/multiple-choice-question.pipe";
import { SingleChoiceValidationPipe } from "../pipes/single-choice-question.pipe";
import { SortingQuestionValidationPipe } from "../pipes/sorting-question.pipe";
import { QuestionTypeValidationPipe } from "../pipes/question-type-validation.pipe";
import { BadRequestException } from "@nestjs/common";


describe('QuizInputValidation', () => {
    
    describe('createQuiz', () => {
      it('should throw ValidationError as name for quiz is empty', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: '',
            questions: [
              { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
            ],
        });
        const errors = await validate(createQuizData);
        expect(errors).toHaveLength(1);
      });
      it('should not throw ValidationError as name for quiz is not empty and is betweend condition 3-15', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [
              { title: 'Question 1', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
            ],
        });
        const errors = await validate(createQuizData);
        expect(errors).toHaveLength(0);
      });
      it('should  throw ValidationError as title is a number but it shouldnt be', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [
              { title: 1, description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
            ],
        });
        const errors = await validate(createQuizData);
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError as we passing not question to questions array', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [2],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError as we passing not question to questions array', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 1, description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError as correctAnswer array is empty', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 'example', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: [] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError description has no length between 5-45', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 'example', description: 'aga', type: 'single-correct-answer', possibleAnswers: ['2', 's'], correctAnswer: ['A'] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should not throw ValidationError as possibleAnswers is empty and it can be becouse is nullable', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 'example', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: [], correctAnswer: ['A'] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(0);
      });
      it('should  throw ValidationError as possibleAnswers has lenght more than 5 which is maximum in input validation for it', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 'example', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['A','B','C','D','E','7'], correctAnswer: ['A'] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should  throw ValidationError as correctAnswer has lenght more than 5 which is maximum in input validation for it', async () => {
        const createQuizData = plainToClass(CreateQuizInput, {
            name: 'matma',
            questions: [{ title: 'example', description: 'agaaa', type: 'single-correct-answer', possibleAnswers: ['A','B'], correctAnswer: ['A','C','D','E','7','2'] },
          ],
        });
        const errors = await validate(createQuizData);
        console.log(errors[0])
        expect(errors).toHaveLength(1);
      });
      it('should throw BadRequestException for invalid correctAnswer length in multiple-choice question where correctanswer cant be longer than possibleanswer', () => {
        const validationPipe = new MultipleChoiceValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'multiple-correct-answer',
                possibleAnswers: ['A', 'B', 'C', 'D', 'E', 'F'],
                correctAnswer: ['A', 'B', 'C', 'D', 'E', 'F','G'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
      it('should not throw BadRequestException for as correctAnswer is length is equal to one as single-correct-answer pipe contition tells', () => {
        const validationPipe = new SingleChoiceValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'single-correct-answer',
                possibleAnswers: ['A', 'B', 'C', 'D', 'E', 'F'],
                correctAnswer: ['A'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).not.toThrow(BadRequestException);
      });
      it('should throw BadRequestException for as correctAnswer is length is equal more than one in single-correct-answer pipe ', () => {
        const validationPipe = new SingleChoiceValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'single-correct-answer',
                possibleAnswers: ['A', 'B', 'C', 'D', 'E', 'F'],
                correctAnswer: ['A','B'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
      it('should throw BadRequestException for as correctAnswer is length is equal more than one in single-correct-answer pipe ', () => {
        const validationPipe = new SingleChoiceValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'single-correct-answer',
                possibleAnswers: ['A', 'B', 'C', 'D', 'E', 'F'],
                correctAnswer: ['A','B'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
      it('should not throw BadRequestException for as correctAnswer is length is equal to possibleAnswres as sorting type question gives only answrs to sort, must use all of theme ', () => {
        const validationPipe = new SortingQuestionValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'sorting-answers',
                possibleAnswers: ['A','B'],
                correctAnswer: ['A','B'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).not.toThrow(BadRequestException);
      });
      it('should throw BadRequestException for as correctAnswer is length is diffrent to possibleAnswres as sorting type question gives only answrs to sort, must use all of theme ', () => {
        const validationPipe = new SortingQuestionValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'sorting-answers',
                possibleAnswers: ['A','B'],
                correctAnswer: ['A','B','C'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
      it('should throw BadRequestException for as correctAnswer for plain-fiel-text question is more than one ', () => {
        const validationPipe = new PlainTextAnswerValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'plain-text-answer',
                correctAnswer: ['A','B','C'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
      it('should not throw BadRequestException for as correctAnswer for plain-fiel-text question is equal to one ', () => {
        const validationPipe = new PlainTextAnswerValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'plain-text-answer',
                correctAnswer: ['A'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).not.toThrow(BadRequestException);
      });
      it('should throw BadRequestException as type of question is not one of these we consider in question-type.enum ', () => {
        const validationPipe = new QuestionTypeValidationPipe();
    
        const invalidInput = {
          metatype: CreateQuizInput,
          value: {
            questions: [
              {
                title: 'example',
                description: 'agaaa',
                type: 'diffrent-type-answer',
                correctAnswer: ['A'], 
              },
            ],
          },
        };
        
        expect(() => validationPipe.transform(invalidInput.value, { metatype: invalidInput.metatype, type: 'body' })).toThrow(BadRequestException);
      });
    });
  });