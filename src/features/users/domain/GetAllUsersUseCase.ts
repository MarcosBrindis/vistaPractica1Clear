import { UserDTO } from "../data/models/UserDTO";
import { UserRepository } from "../data/repository/UserRepository";

export class GetAllUsersUseCase {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(): Promise<UserDTO[] | null> {
        const response: UserDTO[] | null = await this.userRepository.getAllUsers();

        var data = null;
        if (response != null)
            data = response.map(user => new UserDTO(user.id, user.name, user.email));
        console.log("Use Case - All Users: " + JSON.stringify(data));
        
        return data;
    }
}