export default abstract class AbstractRepository {
    // Should return the created object.
    public abstract create(): any;

    // Should return the read object.
    public abstract read(): any;

    // Should return the updated object.
    public abstract update(): any;

    // Should return false if error is received from the DB on delete.
    public abstract delete(): boolean;

    // Should return results of a search query.
    public abstract search(): any;
}