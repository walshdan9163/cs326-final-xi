import AbstractController from "./AbstractController";
import MediaRepository from "../repositories/MediaRepository";
import TagRepository from "../repositories/TagRepository";
import Media from "../entities/Media";
import Response from "../Response";

export default class MediaController extends AbstractController {

    // Defines the GET by ID method for a piece of media.
    public async get(id: number): Promise<Response> {
        const repository: MediaRepository = new MediaRepository();
        const dbData: any = await repository.read(id);

        return new Response(dbData, 200)
    }

    // Deletes media by ID
    public async delete(mediaId: string): Promise<Response> {
        // check if media exists, mocked up because no DB
        const repository: MediaRepository = new MediaRepository();
        const dbData = await repository.search({});
        return new Response(dbData, 200);
    }

    // Defines the POST (creation) for a piece of media.
    public async post(data: any): Promise<Response> {
        if (!((data as Media).name)) {
            return new Response({error: "Does not have expected fields for media"}, 400);
        }

        const repository: MediaRepository = new MediaRepository();
        const dbData = await repository.create(data);

        return new Response(dbData, 200);
    }

    // Associate tag to media
    public async associateTag(data: any, mediaId: string): Promise<Response> {
        const repository: MediaRepository = new MediaRepository();
        const tagRepository: TagRepository = new TagRepository();

        const name = data as string;
        let tag = await tagRepository.create(name);
        const dbData: any = await repository.associateTag(tag, mediaId);

        return new Response(dbData, 200);
    }
};