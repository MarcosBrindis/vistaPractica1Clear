export class FilmHub {
    title: string;
    type: string;
    genre: string;
    duration: number;
    releaseYear: number;

    constructor(title: string, type: string, genre: string, duration: number, releaseYear: number) {
        this.title = title;
        this.type = type;
        this.genre = genre;
        this.duration = duration;
        this.releaseYear = releaseYear;
    }
}