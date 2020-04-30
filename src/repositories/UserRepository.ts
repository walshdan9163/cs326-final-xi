import AbstractRepository from "./AbstractRepository";
import User from "../entities/User";

export default class UserRepository extends AbstractRepository {

    // Creates a new hardware object with a new ID in the database.
    async create(data: any): Promise<any> {
        const user = data as User;

        return this.db.one(`
            INSERT INTO users 
            VALUES (DEFAULT, $1, $2)
            RETURNING id, email
        `, [
            user.email,
            user.password
        ]);
    }

    // Deletes a user object by ID in the database.
    async delete(id: number): Promise<boolean> {
        // TODO: How should I handle returning boolean?
        return this.db.none(`
            DELETE FROM users
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Reads a hardware object by ID from the database.
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM users
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Returns all users from the database.
    async search(data: any): Promise<any> {
        return this.db.many(`
            SELECT * FROM users
        `);
    }

    // Updates a user object by ID with new data in the database.
    async update(id: number, data: any): Promise<any> {
        const user = data as User;

        return this.db.one(`
            UPDATE users
            SET email=$1,
                password=$2
            WHERE id=$3
            RETURNING id, email
        `, [
            user.email,
            user.password,
            id
        ]);
    }

    async readUserSoftware(id: number): Promise<any> {
        return this.db.any(`SELECT s.id, s.name, s.description
        FROM software s
        JOIN userOwnership uo
        ON s.id = uo.techId 
        JOIN users u
        ON uo.userId = u.id
        AND u.id = $1;`,
        [
            id
        ]);
    }

    async readUserHardware(id: number): Promise<any> {
        return this.db.any(`SELECT h.id, h.name, h.description
        FROM hardware h
        JOIN userOwnership uo
        ON h.id = uo.techId 
        JOIN users u
        ON uo.userId = u.id
        AND u.id = $1;`,
        [
            id
        ]);
    }

    async readUserTrades(id: number): Promise<any> {
        return this.db.any(`SELECT * FROM trade
        WHERE ownerId = $1
        OR recipId = $1;`,
        [
            id
        ]);
    }

    async relateUserHardware(id: string, hardwareId: number): Promise<any> {
        return this.db.none(`INSERT INTO userOwnership
        VALUES ($1, $2, 'hardware')`,
        [
            id, hardwareId
        ]);
    }

    async relateUserSoftware(id: string, softwareId: number): Promise<any> {
        return this.db.none(`INSERT INTO userOwnership
        VALUES ($1, $2, 'software');`,
        [
            id, softwareId
        ]);
    }

    async deleteUserSoftware(id: string, softwareId: number): Promise<any> {
        return this.db.none(`DELETE FROM userOwnership
        WHERE userId = $1
        AND techId = $2
        AND techType = 'hardware';`,
        [
            id, softwareId
        ]);
    }

    async deleteUserHardware(id: string, hardwareId: number): Promise<any> {
        return this.db.none(`DELETE FROM userOwnership
        WHERE userId = $1
        AND techId = $2
        AND techType = 'hardware';`,
        [
            id, hardwareId
        ]);
    }
}