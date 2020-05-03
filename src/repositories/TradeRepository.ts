import AbstractRepository from "./AbstractRepository";
import Trade from "../entities/Trade";

export default class TradeRepository extends AbstractRepository {

    // Creates new trade
    async create(data: any): Promise<any> {
        const trade = data as Trade;

        return this.db.one(`
            INSERT INTO trade
            VALUES (DEFAULT, $1, $2, $3)
            RETURNING id
        `, [
            trade.ownerId,
            trade.recipId,
            trade.hardwareId
        ]);
    }

    // Reads existing trade
    async read(id: number): Promise<any> {
        return this.db.one(`
            SELECT * FROM trade
            WHERE id=$1
            `, [
                id
        ]);
    }

    // Updates (accepts) trade
    async update(id: number): Promise<any> {
        return this.db.none(`
            UPDATE trade
            SET accepted=true
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Deletes (rejects) trade
    async delete(id: number): Promise<any> {
        return this.db.none(`
            DELETE FROM trade
            WHERE id=$1
        `, [
            id
        ]);
    }

    // Returns all trades
    async search(data: any) {
        return this.db.many(`
            SELECT *
            FROM trade
        `);
    }
}