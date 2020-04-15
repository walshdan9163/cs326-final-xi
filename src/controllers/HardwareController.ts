import AbstractController from "./AbstractController";
import Hardware from "../entities/Hardware";
import Response from "../Response";

export default class HardwareController extends AbstractController {
    public get(id: number): Response {
        const hardware: Hardware = {
            id,
            name: "Apple II",
            description: "The Apple II"
        };

        return new Response(hardware, 200)
    }

    public post(data: any): Response {
        if (!((data as Hardware).name)) {
            return new Response({error: "Does not have expected fields for hardware."}, 400);
        }

        return new Response({
            id: 1
        }, 201);
    }
};