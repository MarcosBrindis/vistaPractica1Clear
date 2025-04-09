import { UserDTO } from "../data/models/UserDTO";
import { UserRepository } from "../data/repository/UserRepository";

export class GetUserUseCase {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id: number): Promise<UserDTO | null> {
        const response: UserDTO | null = await this.userRepository.getUser(id);

        var data = null;
        if (response != null)
            data = new UserDTO(response.id, response.name, response.email);
        console.log("Use Case " + JSON.stringify(data));
        
        return data;
    }
}