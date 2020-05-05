import AbstractRepository from "./AbstractRepository";
import Media from "../entities/Media";

export default class MediaRepository extends AbstractRepository {

    // Creates a new media object with a new ID in the database.
    async create(data: any): Promise<any> {
        const media = data as Media;

        return this.db.one(`
            INSERT INTO media 
            VALUES (DEFAULT, $1, $2)
            RETURNING id, name, url
        `, [
            media.name,
            media.URL,
        ]);
    }

    // Deletes a media object by ID in the database.
    async delete(id: number): Promise<boolean> {
        // TODO: How should I handle returning boolean?
        return this.db.none(`
            DELETE FROM media
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Reads a media object by ID from the database.
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM media
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Returns all media from the database.
    async search(data: any): Promise<any> {
        return this.db.many(`
            SELECT * FROM media
        `);
    }

    // Associates a tag to software.
    async associateTag(tagId: string, mediaId: string) {
        return this.db.one(`
            INSERT INTO tagRelation
            VALUES ($1, $2, $3)
            RETURNING tagid, techid, techtype
            `, [
                tagId,
                mediaId,
                'media'
        ]);
    }

    // Updates a media object by ID with new data in the database.
    async update(id: number, data: any): Promise<any> {
        const media = data as Media;

        return this.db.one(`
            UPDATE hardware
            SET name=$1,
                url=$2
            WHERE id=$3
            RETURNING id, name, description
        `, [
            media.name,
            media.URL,
            media.id
        ]);
    }

}