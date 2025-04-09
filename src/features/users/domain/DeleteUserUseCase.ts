import { UserRepository } from "../data/repository/UserRepository";

export class DeleteUserUseCase {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id: number): Promise<boolean> {
        const response: boolean = await this.userRepository.deleteUser(id);
        console.log("Use Case - User Deleted: " + response);
        
        return response;
    }
}