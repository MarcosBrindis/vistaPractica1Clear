import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../../data/models/User";
import { CreateUserUseCase } from "../../domain/CreateUserUseCase";

export class RegisterUserModel {
  name: string = '';
  email: string = '';
  error: string | null = null;
  isValid = false; //Se utiliza para verificar si la comunicación con la data (API) ha sido exitosa
  createUserUseCase: CreateUserUseCase;

  constructor() {
    makeAutoObservable(this); //Convierte automáticamente todas las propiedades y métodos públicos de una clase en observables, acciones, computeds, etc., según el contexto.
    this.createUserUseCase = new CreateUserUseCase();
  }

  onChangeName(name: string) {
    this.name = name;
    console.log(name);
  }

  onChangeEmail(email: string) {
    this.email = email;
  }

  async doCreateUser() {
    this.error = null;

    if (this.name !== "" && this.email !== "") {
      let user = new User(this.name, this.email);
      try {
        let data = await this.createUserUseCase.execute(user);
        console.log(JSON.stringify(data));

        runInAction(() => { //se usa para modificar el estado observable de manera segura dentro de una acción asíncrona
          if (data != null)
            this.isValid = true
        });
      } catch (err: any) {
        runInAction(() => {
          this.error = err.message || "Error al crear el usuario";
        });
      }
    } else {
      this.error = "Campos vacíos";
    }
  }
  reset() {
    this.name = '';
    this.email = '';
    this.error = null;
    this.isValid = false;
  }
}