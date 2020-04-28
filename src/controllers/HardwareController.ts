import AbstractController from "./AbstractController";
import Hardware from "../entities/Hardware";
import Response from "../Response";
import HardwareRepository from "../repositories/HardwareRepository";

// NOTE: HOOKED UP TO THE DATABASE!
export default class HardwareController extends AbstractController {

    // Defines the GET by ID method for a piece of hardware.
    public async get(id: number): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();
        const dbData: any = await repository.read(id);
        return new Response(dbData, 200);
    }

    // Returns all hardware
    public async getMany(): Promise<Response> {
        const repository: HardwareRepository = new HardwareRepository();

        const dbData: any = await repository.search({});
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