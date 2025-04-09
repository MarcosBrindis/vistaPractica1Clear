export class FilmHubDTO {
    id: number;
    title: string;
    type: string;
    genre: string;
    duration: number;
    releaseYear: number;

    constructor(id: number, title: string, type: string, genre: string, duration: number, releaseYear: number) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.genre = genre;
        this.duration = duration;
        this.releaseYear = releaseYear;
    }
}