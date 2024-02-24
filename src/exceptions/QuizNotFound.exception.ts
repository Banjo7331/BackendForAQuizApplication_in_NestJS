import { HttpException, HttpStatus } from "@nestjs/common";

export class QuizNotFoundException extends HttpException {
    constructor(msg?: string, status?: HttpStatus){
        super(msg || 'Quiz of this id not found', status || HttpStatus.NOT_FOUND );
    }
}