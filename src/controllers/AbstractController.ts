import Response from "../Response";

export default abstract class AbstractController {
    public abstract get(id: number): Response;
    public abstract post(data: any): Response;
}