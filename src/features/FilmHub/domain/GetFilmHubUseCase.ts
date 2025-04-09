import { FilmHubDTO } from "../data/models/FilmHubDTO";
import { FilmHubRepository } from "../data/repository/FilmHubRepository";

export class GetFilmHubUseCase {
    filmHubRepository: FilmHubRepository;

    constructor() {
        this.filmHubRepository = new FilmHubRepository();
    }

    async execute(id: number): Promise<FilmHubDTO | null> {
        const response: FilmHubDTO | null = await this.filmHubRepository.get(id);

        let data = null;
        if (response != null)
            data = new FilmHubDTO(response.id, response.title, response.type, response.genre, response.duration, response.releaseYear);
        console.log("Use Case: " + JSON.stringify(data));
        
        return data;
    }
}