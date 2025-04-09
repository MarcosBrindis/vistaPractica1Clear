import { FilmHubDTO } from "../data/models/FilmHubDTO";
import { FilmHubRepository } from "../data/repository/FilmHubRepository";

export class UpdateFilmHubUseCase {
    filmHubRepository: FilmHubRepository;

    constructor() {
        this.filmHubRepository = new FilmHubRepository();
    }

    async execute(filmHub: FilmHubDTO): Promise<FilmHubDTO | null> {
        const response: FilmHubDTO | null = await this.filmHubRepository.update(filmHub);

        let data = null;
        if (response != null)
            data = new FilmHubDTO(response.id, response.title, response.type, response.genre, response.duration, response.releaseYear);
        console.log("Use Case: " + JSON.stringify(data));
        
        return data;
    }
}