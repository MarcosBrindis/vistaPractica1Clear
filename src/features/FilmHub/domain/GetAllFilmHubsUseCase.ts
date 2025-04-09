import { FilmHubDTO } from "../data/models/FilmHubDTO";
import { FilmHubRepository } from "../data/repository/FilmHubRepository";

export class GetAllFilmHubsUseCase {
    filmHubRepository: FilmHubRepository;

    constructor() {
        this.filmHubRepository = new FilmHubRepository();
    }

    async execute(): Promise<FilmHubDTO[] | null> {
        const response: FilmHubDTO[] | null = await this.filmHubRepository.getAll();

        let data = null;
        if (response != null)
            data = response.map(filmHub => new FilmHubDTO(filmHub.id, filmHub.title, filmHub.type, filmHub.genre, filmHub.duration, filmHub.releaseYear));
        console.log("Use Case: " + JSON.stringify(data));
        
        return data;
    }
}