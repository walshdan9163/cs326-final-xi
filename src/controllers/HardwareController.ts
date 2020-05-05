import AbstractController from "./AbstractController";
import Hardware from "../entities/Hardware";
import Response from "../Response";
import HardwareRepository from "../repositories/HardwareRepository";
import UserRepository from "../repositories/UserRepository";
import MediaRepository from "../repositories/MediaRepository";
import TagRepository from "../repositories/TagRepository";
import Media from "../entities/Media";

// NOTE: HOOKED UP TO THE DATABASE!
export default class HardwareController extends AbstractController {

    // Defines the GET by ID method for a piece of hardware.
    public async get(id: number): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();
        const dbData: any = await repository.read(id);
        return new Response(dbData, 200);
    }

    // Gets media related to this hardware ID
    public async getRelatedMedia(id: number): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();
        const dbData: any = await repository.relatedMedia(id);
        return new Response(dbData, 200);
    }

    // Returns all hardware
    public async getMany(): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();

        const dbData: any = await repository.search({});
        return new Response(dbData, 200);
    }

    // Associate media to hardware
    public async associateMedia(data: any, hardwareId: string): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();
        const mediaRepository: MediaRepository = new MediaRepository();

        const createdMedia = await mediaRepository.create(data);
        const dbData: any = await repository.associateMedia(createdMedia.id, hardwareId);

        return new Response(dbData, 200);
    }

    // Associate tag to media
    public async associateTag(data: any, hardwareId: string): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();
        const tagRepository: TagRepository = new TagRepository();

        const name = data as string;
        let tag = await tagRepository.create(name);
        const dbData: any = await repository.associateTag(tag, hardwareId);

        return new Response(dbData, 200);
    }

    // Defines the POST (creation) for a piece of hardware.
    public async post(data: any): Promise<Response> {
        if (!((data as Hardware).name)) {
            return new Response({error: "Does not have expected fields for hardware."}, 400);
        }

        const repository: HardwareRepository = new HardwareRepository();
        const dbData: any = await repository.create(data);

        return new Response(dbData, 201);
    }
};