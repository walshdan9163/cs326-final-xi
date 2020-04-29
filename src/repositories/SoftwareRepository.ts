import AbstractRepository from "./AbstractRepository";
import Software from "../entities/Software";

export default class SoftwareRepository extends AbstractRepository {

    // Creates a new software object with a new ID in the database.
    async create(data: any): Promise<any> {
        const software = data as Software;

        return this.db.one(`
            INSERT INTO software 
            VALUES (DEFAULT, $1, $2)
            RETURNING id, name, description
        `, [
            software.name,
            software.description
        ]);
    }

    // Deletes a software object by ID in the database.
    async delete(id: number): Promise<boolean> {
        // TODO: How should I handle returning boolean?
        return this.db.none(`
            DELETE FROM software
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Reads a software object by ID from the database.
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM software
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Returns all software from the database.
    async search(data: any): Promise<any> {
        return this.db.any(`
            SELECT * FROM software
        `);
    }

    // Updates a software object by ID with new data in the database.
    async update(id: number, data: any): Promise<any> {
        const software = data as Software;

        return this.db.one(`
            UPDATE software
            SET name=$1,
                description=$2
            WHERE id=$3
            RETURNING id, name, description
        `, [
            software.name,
            software.description,
            software.id
        ]);
    }

}