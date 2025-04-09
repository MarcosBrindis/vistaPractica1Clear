import { makeAutoObservable, runInAction } from "mobx";
import { FilmHub } from "../../data/models/FilmHub";
import { CreateFilmHubUseCase } from "../../domain/CreateFilmHubUseCase";

export class CreateFilmHubViewModel {
  title: string = '';
  type: string = '';
  genre: string = '';
  duration: number = 0;
  releaseYear: number = 0;
  error: string | null = null;
  isValid = false; // Se utiliza para verificar si la comunicación con la data (API) ha sido exitosa
  createFilmHubUseCase: CreateFilmHubUseCase;

  constructor() {
    makeAutoObservable(this); // Convierte automáticamente todas las propiedades y métodos públicos de una clase en observables, acciones, computeds, etc., según el contexto.
    this.createFilmHubUseCase = new CreateFilmHubUseCase();
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

  async doCreateFilmHub() {
    this.error = null;

    if (this.title !== "" && this.type !== "" && this.genre !== "" && this.duration > 0 && this.releaseYear > 0) {
      let filmHub = new FilmHub(this.title, this.type, this.genre, this.duration, this.releaseYear);
      try {
        let data = await this.createFilmHubUseCase.execute(filmHub);
        console.log(JSON.stringify(data));
        
        runInAction(() => { // se usa para modificar el estado observable de manera segura dentro de una acción asíncrona
          if (data != null)
            this.isValid = true;
        });
      } catch (err: any) {
        runInAction(() => {
          this.error = err.message || "Error al crear el film.";
        });
      }
    } else {
      this.error = "Campos vacíos";
    }
  }

  reset() {
    this.title = '';
    this.type = '';
    this.genre = '';
    this.duration = 0;
    this.releaseYear = 0;
    this.error = null;
    this.isValid = false;
  }
}