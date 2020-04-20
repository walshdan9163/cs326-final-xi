import AbstractController from "./AbstractController";
import Hardware from "../entities/Hardware";
import Response from "../Response";

export default class HardwareController extends AbstractController {

    // Defines the GET by ID method for a piece of hardware.
    public get(id: number): Response {
        const hardware: Hardware = {
            id: 1,
            name: "Apple II",
            description: "The Apple II",
        };

        return new Response(hardware, 200)
    }

    public getMany(): Response {
        const hardware: Hardware[] = [
            {id: 1, name: "Apple II", description: "The Apple II"},
            {id: 2, name: "IBM PC", description: "The IBM PC"}
        ];

        return new Response(hardware, 200);
    }

    // Defines the POST (creation) for a piece of hardware.
    public post(data: any): Response {
        if (!((data as Hardware).name)) {
            return new Response({error: "Does not have expected fields for hardware."}, 400);
        }

        return new Response({
            id: 1,
            name: data.name,
            description: data.description

        }, 201);
    }
};