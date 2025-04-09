import { FilmHubRepository } from "../data/repository/FilmHubRepository";

export class DeleteFilmHubUseCase {
    filmHubRepository: FilmHubRepository;

    constructor() {
        this.filmHubRepository = new FilmHubRepository();
    }

    async execute(id: number): Promise<boolean> {
        const response: boolean = await this.filmHubRepository.delete(id);
        console.log("Use Case - FilmHub Deleted: " + response);
        
        return response;
    }
}