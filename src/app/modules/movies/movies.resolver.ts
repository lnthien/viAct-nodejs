import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { BaseResolver } from '../../../vendors/base/base.resolver';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/movies.dto';
import { ErrorCode, ErrorMessage } from '../../../common/messages';

@Resolver('Movies')
export class MoviesResolver extends BaseResolver {
  constructor(private moviesService: MoviesService) {
    super();
  }

  @Mutation('addMovies')
  async addMovies(@Args('input') input: CreateMoviesDto): Promise<any> {
    try {
      await this.moviesService.createOrUpdate(input);
      return this.response(null);
    } catch (e) {
      throw e;
    }
  }

  @Query('getMovies')
  async getMovies(@Args('input') input: CreateMoviesDto): Promise<any> {
    try {
      const data = await this.moviesService.findAll();
      return this.response(data);
    } catch (e) {
      throw e;
    }
  }

  @Query('getMovie')
  async getMovie(@Args('id') id: string): Promise<any> {
    try {
      const data = await this.moviesService.findOne(id);
      if (!data) {
        return this.response(null, {
          statusCode: ErrorCode.NOT_FOUND,
          message: ErrorMessage.DATA_NOT_FOUND
        });
      }
      return this.response(data);
    } catch (e) {
      throw e;
    }
  }
}
