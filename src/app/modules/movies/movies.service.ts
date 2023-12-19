import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config({});

import { CreateMoviesDto } from './dto/movies.dto';
import { Movies, MoviesDocument } from './schemas/movies.schema';
import { POPULAR_MOVIES_URL } from './constant/movies.constant';
import { Logger } from '../../../common/logger/logger';
import { MovieTransformer } from './interfaces/movies.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name)
    private moviesModel: Model<MoviesDocument>,
    private logger: Logger
  ) {}

  async findOne(id: string): Promise<any> {
    return this.moviesModel
      .findOne({
        id,
      })
      .exec();
  }

  async updateOne(createMoviesDto: CreateMoviesDto): Promise<any> {
    return this.moviesModel
      .updateOne(
        {
          id: createMoviesDto.id,
        },
        createMoviesDto
      )
      .exec();
  }

  async createOrUpdate(createMoviesDto: CreateMoviesDto): Promise<any> {
    if (await this.findOne(createMoviesDto.id)) {
      return await this.updateOne(createMoviesDto);
    }
    // Convert raw data to model
    const fullMovieData = new MovieTransformer(createMoviesDto);
    const createdMovies = new this.moviesModel(fullMovieData);
    return createdMovies.save();
  }

  async findAll(): Promise<Movies[]> {
    return this.moviesModel.find().exec();
  }

  @Cron('0 0 0 * * *')
  async refreshDataDaily(): Promise<any> {
    try {
      // Get XX pages popular
      const pages = 10;
      let popularMoviesUrl;
      for (let i = 1; i <= pages; i++) {
        // Add page
        popularMoviesUrl = `${POPULAR_MOVIES_URL}${i}`;
        const result = await axios.get(popularMoviesUrl);
        const moviesData = result.data.results;
        for (const movie of moviesData) {
          await this.createOrUpdate(movie);
        }
        // Remove page
        popularMoviesUrl = popularMoviesUrl.slice(0, -1);
        this.logger.log(`${result.headers.date} ${JSON.stringify(result.config)}`);
        // this.logger.log(`Successfully refresh data page ${i} with ${moviesData.length} movies!`);
      }
    } catch (e) {
      throw e;
    }
  }
}
