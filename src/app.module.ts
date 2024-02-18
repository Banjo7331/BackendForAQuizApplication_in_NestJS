import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './typeorm/entities/Quiz';
import { QuizAttempt } from './typeorm/entities/QuizAttempt';
import { Question } from './typeorm/entities/Question';
import { UserAnswer } from './typeorm/entities/UserQuestionAnswerInput';
import { QuizAttemptModule } from './quizAttempt/quizAttempt.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',

  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres_db',
    port: 5432,
    username: 'testuser',
    password: 'testuser123',
    database: 'post_db',
    entities: [Quiz,QuizAttempt,Question,UserAnswer],
    synchronize: true,
  }),
  QuizModule,
  QuizAttemptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
