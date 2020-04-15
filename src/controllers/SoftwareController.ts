import AbstractController from "./AbstractController";
import Software from "../entities/Software";
import Response from "../Response";

export default class SoftwareController extends AbstractController {
    public get(id: number): Response {
        const software: Software = {
            id,
            name: "Doom",
            description: "The game Doom"
        };

        return new Response(software, 200)
    }

    public post(data: any): Response {
        if (!((data as Software).name)) {
            return new Response({error: "Does not have expected fields for software."}, 400);
        }

        return new Response({
            id: 1
        }, 201);
    }
};