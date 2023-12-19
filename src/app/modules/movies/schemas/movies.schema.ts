import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoviesDocument = Movies & Document;

@Schema()
export class Movies {
  @Prop()
  id: string;

  @Prop()
  adult: boolean;

  @Prop()
  backdropPath: string;

  @Prop()
  genreIds: number[];

  @Prop()
  originalLanguage: string;

  @Prop()
  originalTitle: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: string;

  @Prop()
  posterPath: string;

  @Prop()
  releaseDate: string;

  @Prop()
  title: string;

  @Prop()
  video: boolean;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
