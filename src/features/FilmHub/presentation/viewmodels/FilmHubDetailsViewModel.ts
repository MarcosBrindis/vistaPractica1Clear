import { makeAutoObservable, runInAction } from "mobx";
import { FilmHubDTO } from "../../data/models/FilmHubDTO";
import { GetFilmHubUseCase } from "../../domain/GetFilmHubUseCase";

export class FilmHubDetailsViewModel {
  filmDetails: FilmHubDTO | null = null;
  error: string | null = null;
  getFilmHubUseCase: GetFilmHubUseCase;

  constructor() {
    makeAutoObservable(this);
    this.getFilmHubUseCase = new GetFilmHubUseCase();
  }

  async fetchFilmHubDetails(id: number) {
    this.error = null;
    try {
      const film: FilmHubDTO | null = await this.getFilmHubUseCase.execute(id);
      runInAction(() => {
        if (film) {
          this.filmDetails = film;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al obtener los detalles del film.";
      });
    }
  }

  reset() {
    this.filmDetails = null;
    this.error = null;
  }
}