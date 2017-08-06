export class Movie {
    constructor(
        public title: string, 
        public year: number, 
        public genre: string, 
        public length: string,
        public description: string,
        public actors: string,
        public poster: string,
        public thumbnail: string,
    ) {}
}

let movie: Movie;

