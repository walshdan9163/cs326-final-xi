import {sha512} from "js-sha512";
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
            sha512(user.password)
        ]);
    }

    async login(data: any): Promise<any> {
        return this.db.oneOrNone(`
            SELECT * FROM users
            WHERE email=$1 AND password=$2
        `,
        [
           data.email,
           sha512(data.password)
        ]);
    }

    async generateToken(id: number): Promise<any> {
        // @ts-ignore
        const UIDGenerator = require('uid-generator');
        const uidgen = new UIDGenerator();

        return this.db.one(`
            INSERT INTO authentication
            VALUES ($1,$2,$3)
            RETURNING userid, token, exp
        `, [
            id,
            uidgen.generateSync(),
            // Set Expiration 24 hours into the future.
            // @see https://i.ytimg.com/vi/UdvfS1JCaZo/maxresdefault.jpg
            new Date(Math.floor(Date.now()) + 1000 * 60 * 60 * 24).toISOString()
        ]);
    }

    async validateToken(id: number, token: string): Promise<boolean> {
        const dbToken = await this.db.oneOrNone(`
            SELECT * FROM authentication
            WHERE userid=$1 AND token=$2 AND exp > $3
        `, [
            id,
            token,
            new Date(Date.now()).toISOString()
        ]);

        return !!dbToken;
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

    async readUserByEmail(email: string): Promise<any> {
        return this.db.one(`SELECT * 
        FROM users
        WHERE email=$1`,
        [
            email
        ]);
    }

    async readUserSoftware(id: number): Promise<any> {
        return this.db.any(`SELECT s.id, s.name, s.description, uo.techtype
        FROM software s
        JOIN userOwnership uo
        ON s.id = uo.techId 
        JOIN users u
        ON uo.userId = u.id
        AND u.id = $1
        WHERE uo.techtype = 'software'`,
        [
            id
        ]);
    }

    async readUserHardware(id: number): Promise<any> {
        return this.db.any(`SELECT h.id, h.name, h.description, uo.techtype
        FROM hardware h
        JOIN userOwnership uo
        ON h.id = uo.techId 
        JOIN users u
        ON uo.userId = u.id
        AND u.id = $1
        WHERE uo.techtype = 'hardware'`,
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
        AND techType = 'software';`,
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