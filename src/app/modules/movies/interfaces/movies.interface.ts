import { Movies } from '../schemas/movies.schema';

export class MovieTransformer extends Movies {
  constructor(MovieInput) {
    super();
    this.id = MovieInput.id;
    this.adult = MovieInput.adult;
    this.popularity = MovieInput.popularity;
    this.title = MovieInput.title;
    this.video = MovieInput.video;
    this.overview = MovieInput.overview;
    this.genreIds = MovieInput.genre_ids;
    this.backdropPath = MovieInput.backdrop_path;
    this.originalLanguage = MovieInput.original_language;
    this.originalTitle = MovieInput.original_title;
    this.posterPath = MovieInput.poster_path;
    this.releaseDate = MovieInput.release_date;
    this.releaseDate = MovieInput.release_date;
    this.voteAverage = MovieInput.vote_average;
    this.voteCount = MovieInput.vote_count;
  }
}
