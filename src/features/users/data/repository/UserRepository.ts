import { UserDTO } from "../models/UserDTO";
import { User } from "../models/User";

export class UserRepository {
    async create(user: User): Promise<UserDTO | null> {
        const response = await fetch(import.meta.env.VITE_URL, {
            method: 'POST',
            body: JSON.stringify({
                name: user.name,
                email: user.email
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
        if (!response.ok) return null;
        const data: UserDTO = await response.json();
        return data;
    }

    async updateUser(id: number, user: User): Promise<UserDTO | null> {
        const response = await fetch(`${import.meta.env.VITE_URL}${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: user.name,
                email: user.email
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;
        const data: UserDTO = await response.json();
        return data;
    }

    async deleteUser(id: number): Promise<boolean> {
        const response = await fetch(`${import.meta.env.VITE_URL}${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }

    async getUser(id: number): Promise<UserDTO | null> {
        const response = await fetch(`${import.meta.env.VITE_URL}${id}`, {
            method: 'GET'
        });
        if (!response.ok) return null;
        const data: UserDTO = await response.json();
        return data;
    }

    async getAllUsers(): Promise<UserDTO[] | null> {
        const response = await fetch(import.meta.env.VITE_URL, {
            method: 'GET'
        });
        if (!response.ok) return null;
        const data: UserDTO[] = await response.json();
        return data;
    }
}