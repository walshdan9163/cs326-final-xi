import AbstractController from "./AbstractController";
import Media from "../entities/Media";
import Response from "../Response";

export default class MediaController extends AbstractController {

    // Defines the GET by ID method for a piece of media.
    public get(id: number): Response {
        const media: Media = {
            id: 1,
            name: "AppleII",
            URL: "https://mercari-images.global.ssl.fastly.net/photos/m77335878796_1.jpg?1557359214"
        };

        return new Response(media, 200)
    }

    // Deletes media by ID
    public delete(mediaId: string): Response {
        // check if media exists, mocked up because no DB
        const mockMedia: Media = {
            id: 1,
            name: "The Hitchhiker's Guide to the Galaxy",
            URL: "http://http://www.pethealthnetwork.com/sites/default/files/content/images/my-cat-aggressive-fb-501276867.jpg"
        };

        if(parseInt(mediaId, 10) !== mockMedia.id) {
            return new Response("Media ID does not exist", 400);
        }

        // Returns deleted media and confirmation.
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