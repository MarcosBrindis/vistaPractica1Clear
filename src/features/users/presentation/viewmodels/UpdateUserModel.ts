import { makeAutoObservable, runInAction } from "mobx";
import { UserDTO } from "../../data/models/UserDTO";
import { GetUserUseCase } from "../../domain/GetUserUseCase";
import { UpdateUserUseCase } from "../../domain/UpdateUserUseCase";

export class UpdateUserModel {
  name: string = '';
  email: string = '';
  error: string | null = null;
  isUpdated = false;
  getUserUseCase: GetUserUseCase;
  updateUserUseCase: UpdateUserUseCase;

  constructor() {
    makeAutoObservable(this);
    this.getUserUseCase = new GetUserUseCase();
    this.updateUserUseCase = new UpdateUserUseCase();
  }

  async fetchUser(userId: number) {
    this.error = null;
    try {
      const user: UserDTO | null = await this.getUserUseCase.execute(userId);
      runInAction(() => {
        if (user) {
          this.name = user.name;
          this.email = user.email;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error fetching user data";
      });
    }
  }

  onChangeName(name: string) {
    this.name = name;
  }

  onChangeEmail(email: string) {
    this.email = email;
  }

  async updateUser(userId: number) {
    this.error = null;
    try {
      const updatedUser: UserDTO | null = await this.updateUserUseCase.execute(userId, {
        name: this.name,
        email: this.email
      });

      runInAction(() => {
        if (updatedUser) {
          this.isUpdated = true;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error updating user";
      });
    }
  }

  reset() {
    this.name = '';
    this.email = '';
    this.error = null;
    this.isUpdated = false;
  }
}