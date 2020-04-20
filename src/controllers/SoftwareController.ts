import AbstractController from "./AbstractController";
import Software from "../entities/Software";
import Response from "../Response";

export default class SoftwareController extends AbstractController {

    // Defines the GET by ID method for a piece of software.
    public get(id: number): Response {
        const software: Software = {
            id: 1,
            name: "Doom",
            description: "The game Doom", 
            related : [ {id: 1, name: "Mac OS", description: "The latest Mac OS"},
                        {id: 2, name: "Photoshop", description: "Probably should just pirate this"}]
        };

        return new Response(software, 200)
    }

    public getMany(): Response {
        const software: Software[] = [
            {id: 1, name: "Mac OS", description: "The latest Mac OS"},
            {id: 2, name: "Photoshop", description: "Probably should just pirate this"}
        ];

        return new Response(software, 200);
    }

    // Defines the POST (creation) for a piece of software.
    public post(data: any): Response {
        if (!((data as Software).name)) {
            return new Response({error: "Does not have expected fields for software."}, 400);
        }

        return new Response({
            id: 1,
            name: data.name,
            description: data.description
        }, 201);
    }
};