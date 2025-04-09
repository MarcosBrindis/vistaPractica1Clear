import { UserDTO } from "../data/models/UserDTO";
import { User } from "../data/models/User";
import { UserRepository } from "../data/repository/UserRepository";

export class CreateUserUseCase {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(user: User): Promise<UserDTO | null> {
        const response: UserDTO | null = await this.userRepository.create(user);

        var data = null;
        if (response != null)
            data = new UserDTO(response.id, response.name, response.email);
        console.log("Use Case " + JSON.stringify(data));
        
        return data;
    }
}