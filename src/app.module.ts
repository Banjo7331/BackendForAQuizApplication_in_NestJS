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
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',

  }),
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      entities: [Quiz, QuizAttempt, UserAnswer, Question],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
  QuizModule,
  QuizAttemptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
