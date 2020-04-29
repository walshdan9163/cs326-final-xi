import AbstractController from "./AbstractController";
import SoftwareRepository from "../repositories/SoftwareRepository";
import Software from "../entities/Software";
import Response from "../Response";

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