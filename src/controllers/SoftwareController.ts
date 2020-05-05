import AbstractController from "./AbstractController";
import SoftwareRepository from "../repositories/SoftwareRepository";
import TagRepository from "../repositories/TagRepository";
import Software from "../entities/Software";
import Response from "../Response";
import MediaRepository from "../repositories/MediaRepository";

export default class SoftwareController extends AbstractController {

    // Defines the GET by ID method for a piece of software.
    public async get(id: number): Promise<Response> {
        const repository: SoftwareRepository = new SoftwareRepository();
        const dbData: any = await repository.read(id);
        return new Response(dbData, 200);
    }

    // Gets media related to this hardware ID
    public async getRelatedMedia(id: number): Promise<Response> {
        const repository: SoftwareRepository = new SoftwareRepository();
        const dbData: any = await repository.relatedMedia(id);
        return new Response(dbData, 200);
    }

    public async getMany(): Promise<Response> {
        const repository: SoftwareRepository = new SoftwareRepository();
        const dbData = await repository.search({});
        return new Response(dbData, 200);
    }

    // Associate media to software
    public async associateMedia(data: any, softwareId: string): Promise<Response> {
        const repository: SoftwareRepository = new SoftwareRepository();
        const mediaRepository: MediaRepository = new MediaRepository();

        const createdMedia = await mediaRepository.create(data);
        const dbData: any = await repository.associateMedia(createdMedia.id, softwareId);

        return new Response(dbData, 200);
    }

    // Associate tag to media
    public async associateTag(data: any, softwareId: string): Promise<Response> {
        const repository: SoftwareRepository = new SoftwareRepository();
        const tagRepository: TagRepository = new TagRepository();

        const name = data as string;
        let tag = await tagRepository.create(name);
        const dbData: any = await repository.associateTag(tag, softwareId);

        return new Response(dbData, 200);
    }

    // Defines the POST (creation) for a piece of software.
    public async post(data: any): Promise<Response> {
        if (!((data as Software).name)) {
            return new Response({error: "Does not have expected fields for software."}, 400);
        }

        const repository: SoftwareRepository = new SoftwareRepository();
        const dbData = await repository.create(data);

        return new Response(dbData, 200);
    }
};