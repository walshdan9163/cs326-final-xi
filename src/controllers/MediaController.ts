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

    // Deletes media by ID
    public delete(mediaId: string): Response {
        // check if media exists, mocked up because no DB
        const mockMedia: Media = {
            id: 42,
            name: "The Hitchhiker's Guide to the Galaxy",
            URL: "http://www.example.com"
        };

        if(parseInt(mediaId, 10) !== mockMedia.id) {
            return new Response("Media ID does not exist", 400);
        }
        // RUN DELETE HERE
        return new Response(mockMedia, 200);
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