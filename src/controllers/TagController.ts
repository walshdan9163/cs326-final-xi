import AbstractController from "./AbstractController";
import Tag from "../entities/Tag";
import Response from "../Response";

export default class TagController extends AbstractController {

    // Defines the GET by ID method for a tag.
    public async get(id: number): Promise<Response> {
        const media: Tag = {
            name: "Apple"
        };

        return new Response(media, 200)
    }

    // Defines the POST (creation) for a tag.
    public async post(data: any): Promise<Response> {
        if (!((data as Tag).name)) {
            return new Response({error: "Does not have expected fields for tag"}, 400);
        }

        return new Response({
            name: data.name
        }, 201);
    }
};