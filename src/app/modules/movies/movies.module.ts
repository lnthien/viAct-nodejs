import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { Movies, MoviesSchema } from './schemas/movies.schema';
import { LoggerModule } from '../../../common/logger/logger.module';
import { Logger } from '../../../common/logger/logger';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }])],
  providers: [Logger, MoviesService, MoviesResolver],
})
export class MoviesModule {}
