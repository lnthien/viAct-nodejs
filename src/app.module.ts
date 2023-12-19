import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorMiddleware } from './vendors/middlewares/author.middleware';
import graphQLConfig from './configs/graphQL';
import { LoggerModule } from './common/logger/logger.module';
import { Logger } from './common/logger/logger';
import { MoviesModule } from './app/modules/movies/movies.module';

@Module({
  imports: [
    GraphQLModule.forRoot(graphQLConfig),
    MongooseModule.forRoot('mongodb://localhost:27017/omnilabs'),
    ScheduleModule.forRoot(),
    LoggerModule,
    MoviesModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }
  async init() {
    new Logger().log(`${AppModule.name} init`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes({ path: '/graphql*', method: RequestMethod.ALL });
  }
}
