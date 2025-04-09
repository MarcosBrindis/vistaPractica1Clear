import { makeAutoObservable, runInAction } from "mobx";
import { FilmHubDTO } from "../../data/models/FilmHubDTO";
import { UpdateFilmHubUseCase } from "../../domain/UpdateFilmHubUseCase";
import { GetFilmHubUseCase } from "../../domain/GetFilmHubUseCase";

export class UpdateFilmHubViewModel {
  id: number = 0;
  title: string = '';
  type: string = '';
  genre: string = '';
  duration: number = 0;
  releaseYear: number = 0;
  error: string | null = null;
  isUpdated = false;
  updateFilmHubUseCase: UpdateFilmHubUseCase;
  getFilmHubUseCase: GetFilmHubUseCase;

  constructor() {
    makeAutoObservable(this);
    this.updateFilmHubUseCase = new UpdateFilmHubUseCase();
    this.getFilmHubUseCase = new GetFilmHubUseCase();
  }

  async fetchFilmHub(id: number) {
    this.error = null;
    try {
      const film: FilmHubDTO | null = await this.getFilmHubUseCase.execute(id);
      runInAction(() => {
        if (film) {
          this.id = film.id;
          this.title = film.title;
          this.type = film.type;
          this.genre = film.genre;
          this.duration = film.duration;
          this.releaseYear = film.releaseYear;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al obtener los detalles del film.";
      });
    }
  }

  onChangeTitle(title: string) {
    this.title = title;
  }
  
  onChangeType(type: string) {
    this.type = type;
  }

  onChangeGenre(genre: string) {
    this.genre = genre;
  }

  onChangeDuration(duration: string) {
    this.duration = Number.parseFloat(duration);
  }

  onChangeReleaseYear(releaseYear: string) {
    this.releaseYear = Number.parseInt(releaseYear);
  }

  async doUpdateFilmHub() {
    this.error = null;

    if (this.title !== "" && this.type !== "" && this.genre !== "" && this.duration > 0 && this.releaseYear > 0) {
      let filmHub = new FilmHubDTO(this.id, this.title, this.type, this.genre, this.duration, this.releaseYear);
      try {
        let data = await this.updateFilmHubUseCase.execute(filmHub);
        console.log(JSON.stringify(data));
        
        runInAction(() => { // se usa para modificar el estado observable de manera segura dentro de una acción asíncrona
          if (data != null)
            this.isUpdated = true;
        });
      } catch (err: any) {
        runInAction(() => {
          this.error = err.message || "Error al actualizar el film.";
        });
      }
    } else {
      this.error = "Campos vacíos";
    }
  }

  reset() {
    this.id = 0;
    this.title = '';
    this.type = '';
    this.genre = '';
    this.duration = 0;
    this.releaseYear = 0;
    this.error = null;
    this.isUpdated = false;
  }
}