import Response from "../Response";

export default abstract class AbstractController {
    public abstract async get(id: number): Promise<Response>;
    public abstract async post(data: any): Promise<Response>;
}