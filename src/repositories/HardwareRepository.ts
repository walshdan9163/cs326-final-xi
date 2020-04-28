import AbstractRepository from "./AbstractRepository";
import Hardware from "../entities/Hardware";

class HardwareRepository extends AbstractRepository {
    async create(data: any): Promise<any> {
        const hardware = data as Hardware;

        return this.db.none(`
            INSERT INTO hardware 
            VALUES (DEFAULT, $1, $2)
        `, [
            hardware.name,
            hardware.description
        ])
    }

    async delete(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    async read(id: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async search(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    async update(id: number, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}