export default abstract class AbstractRepository {
    // Should return the created object.
    public abstract async create(): Promise<any>;

    // Should return the read object.
    public abstract async ead(): Promise<any>;

    // Should return the updated object.
    public abstract async update(): Promise<any>;

    // Should return false if error is received from the DB on delete.
    public abstract async delete(): Promise<boolean>;

    // Should return results of a search query.
    public abstract async search(): Promise<any>;
}