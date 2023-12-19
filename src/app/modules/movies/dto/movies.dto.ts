export class CreateMoviesDto {
  id: string;
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: string;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
