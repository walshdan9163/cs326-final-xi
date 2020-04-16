import AbstractController from "./AbstractController";
import Media from "../entities/Media";
import Response from "../Response";

export default class MediaController extends AbstractController {

    // Defines the GET by ID method for a piece of media.
    public get(id: number): Response {
        const media: Media = {
            id,
            name: "AppleII",
            URL: "http://AppleII.jpg"
        };

        return new Response(media, 200)
    }

    // Defines the POST (creation) for a piece of media.
    public post(data: any): Response {
        if (!((data as Media).name)) {
            return new Response({error: "Does not have expected fields for media"}, 400);
        }

        return new Response({
            id: 1,
            name: data.name,
            URL: data.URL
        }, 201);
    }
};