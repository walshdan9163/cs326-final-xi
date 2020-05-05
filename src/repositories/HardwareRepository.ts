import AbstractRepository from "./AbstractRepository";
import Hardware from "../entities/Hardware";

export default class HardwareRepository extends AbstractRepository {

    // Creates a new hardware object with a new ID in the database.
    async create(data: any): Promise<any> {
        const hardware = data as Hardware;

        return this.db.one(`
            INSERT INTO hardware 
            VALUES (DEFAULT, $1, $2)
            RETURNING id, name, description
        `, [
            hardware.name,
            hardware.description
        ]);
    }

    // Deletes a hardware object by ID in the database.
    async delete(id: number): Promise<boolean> {
        // TODO: How should I handle returning boolean?
        return this.db.none(`
            DELETE FROM hardware
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Reads a hardware object by ID from the database.
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM hardware
            WHERE id=$1
        `, [
            id
        ]);
    }

    // returns ID of media related to hardware object.
    async relatedMedia(id: number): Promise<any> {
        return this.db.oneOrNone(`
            SELECT mediaId FROM mediaRelation
            WHERE techType = 'hardware' and techId=$1
        `, [
            id
        ]);
    }

    // Associates a piece of media to hardware.
    async associateMedia(mediaId: string, hardwareId: string): Promise<any> {


        return this.db.one(`
            INSERT INTO mediaRelation
            VALUES ($1, $2, $3)
            RETURNING mediaid, techid, techtype
        `, [
            mediaId,
            hardwareId,
            'hardware'
        ]);
    }

    // Returns all hardware from the database.
    async search(data: any): Promise<any> {
        return this.db.many(`
            SELECT * FROM hardware
        `);
    }

    // Associates a tag to hardware.
    async associateTag(tagId: string, hardwareId: string) {
        return this.db.one(`
            INSERT INTO tagRelation
            VALUES ($1, $2, $3)
            RETURNING tagid, techid, techtype
            `, [
                tagId,
                hardwareId,
                'hardware'
        ]);
    }

    // Updates a hardware object by ID with new data in the database.
    async update(id: number, data: any): Promise<any> {
        const hardware = data as Hardware;

        return this.db.one(`
            UPDATE hardware
            SET name=$1,
                description=$2
            WHERE id=$3
            RETURNING id, name, description
        `, [
            hardware.name,
            hardware.description,
            hardware.id
        ]);
    }

}