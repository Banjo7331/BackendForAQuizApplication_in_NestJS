import { HttpException, HttpStatus } from "@nestjs/common";

export class QuestionNotFoundException extends HttpException {
    constructor(id?: number, msg?: string, status?: HttpStatus, ){
        super(msg || `Question of id: ${id} not found`, status || HttpStatus.NOT_FOUND );
    }
}