import { FilmHubDTO } from "../models/FilmHubDTO";
import { FilmHub } from "../models/FilmHub";

export class FilmHubRepository {
    async create(filmHub: FilmHub): Promise<FilmHubDTO | null> {
        const response = await fetch(import.meta.env.VITE_URL2, {
            method: 'POST',
            body: JSON.stringify({
                title: filmHub.title,
                type: filmHub.type,
                genre: filmHub.genre,
                duration: filmHub.duration,
                releaseYear: filmHub.releaseYear
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;
        const data: FilmHubDTO = await response.json();
        return data;
    }

    async update(filmHub: FilmHubDTO): Promise<FilmHubDTO | null> {
        const response = await fetch(`${import.meta.env.VITE_URL2}${filmHub.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: filmHub.title,
                type: filmHub.type,
                genre: filmHub.genre,
                duration: filmHub.duration,
                releaseYear: filmHub.releaseYear
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;
        const data: FilmHubDTO = await response.json();
        return data;
    }

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`${import.meta.env.VITE_URL2}${id}`, {
            method: 'DELETE'
        });

        return response.ok;
    }

    async get(id: number): Promise<FilmHubDTO | null> {
        const response = await fetch(`${import.meta.env.VITE_URL2}${id}`, {
            method: 'GET'
        });

        if (!response.ok) return null;
        const data: FilmHubDTO = await response.json();
        return data;
    }

    async getAll(): Promise<FilmHubDTO[] | null> {
        const response = await fetch(import.meta.env.VITE_URL2, {
            method: 'GET'
        });

        if (!response.ok) return null;
        const data: FilmHubDTO[] = await response.json();
        return data;
    }
}