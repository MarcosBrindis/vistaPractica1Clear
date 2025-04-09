import { makeAutoObservable, runInAction } from "mobx";
import { FilmHubDTO } from "../../data/models/FilmHubDTO";
import { GetAllFilmHubsUseCase } from "../../domain/GetAllFilmHubsUseCase";
import { DeleteFilmHubUseCase } from "../../domain/DeleteFilmHubUseCase";

export class FilmHubManagementModel {
  films: FilmHubDTO[] = [];
  error: string | null = null;
  getAllFilmHubsUseCase: GetAllFilmHubsUseCase;
  deleteFilmHubUseCase: DeleteFilmHubUseCase;

  constructor() {
    makeAutoObservable(this);
    this.getAllFilmHubsUseCase = new GetAllFilmHubsUseCase();
    this.deleteFilmHubUseCase = new DeleteFilmHubUseCase();
  }

  async fetchFilms() {
    this.error = null;
    try {
      const films: FilmHubDTO[] | null = await this.getAllFilmHubsUseCase.execute();
      runInAction(() => {
        if (films) {
          this.films = films;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error fetching films";
      });
    }
  }

  async deleteFilm(id: number) {
    this.error = null;
    try {
      const result = await this.deleteFilmHubUseCase.execute(id);
      if (result) {
        runInAction(() => {
          this.films = this.films.filter(film => film.id !== id);
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error deleting film";
      });
    }
  }
}