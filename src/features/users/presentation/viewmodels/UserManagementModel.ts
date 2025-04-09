import { makeAutoObservable, runInAction } from "mobx";
import { UserDTO } from "../../data/models/UserDTO";
import { GetAllUsersUseCase } from "../../domain/GetAllUsersUseCase";
import { DeleteUserUseCase } from "../../domain/DeleteUserUseCase";

export class UserManagementModel {
  users: UserDTO[] = [];
  error: string | null = null;
  getAllUsersUseCase: GetAllUsersUseCase;
  deleteUserUseCase: DeleteUserUseCase;

  constructor() {
    makeAutoObservable(this);
    this.getAllUsersUseCase = new GetAllUsersUseCase();
    this.deleteUserUseCase = new DeleteUserUseCase();
  }

  async fetchUsers() {
    this.error = null;
    try {
      const users: UserDTO[] | null = await this.getAllUsersUseCase.execute();
      runInAction(() => {
        if (users) {
          this.users = users;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error fetching users";
      });
    }
  }

  async deleteUser(userId: number) {
    this.error = null;
    try {
      const result = await this.deleteUserUseCase.execute(userId);
      if (result) {
        runInAction(() => {
          this.users = this.users.filter(user => user.id !== userId);
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error deleting user";
      });
    }
  }
}