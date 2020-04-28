export default abstract class AbstractRepository {
    protected db: any;

    constructor() {
        // @ts-ignore
        const pgp = require('pg-promise')();
        this.db = pgp(process.env.DB_URL);
    }

    // Should return the created object.
    public abstract async create(data: any): Promise<any>;

    // Should return the read object.
    public abstract async read(id: number): Promise<any>;

    // Should return the updated object.
    public abstract async update(id: number, data: any): Promise<any>;

    // Should return false if error is received from the DB on delete.
    public abstract async delete(id: number): Promise<boolean>;

    // Should return results of a search query.
    public abstract async search(data: any): Promise<any>;
}