import AbstractRepository from "./AbstractRepository";
import Tag from "../entities/Tag";

export default class TagRepository extends AbstractRepository {

    // Creates new tag
    async create(data: any): Promise<any> {
        const tag = data as string;

        return this.db.one(`
            INSERT INTO tag
            VALUES (DEFAULT, $1)
            RETURNING id
        `, [
            tag
        ]);
    }

    // Reads existing tag
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM tag
            WHERE id=$1
            `, [
                id
        ]);
    }

    // Updates tag
    async update(id: number, value: string): Promise<any> {
        return this.db.none(`
            UPDATE tag
            SET name=$2
            WHERE id=$1
        `, [
            id,
            value
        ]);
    }

    // Deletes tag
    async delete(id: number): Promise<any> {
        return this.db.none(`
            DELETE FROM tag
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Returns all tags
    async search(data: any) {
        return this.db.many(`
            SELECT *
            FROM tag
        `);
    }
}