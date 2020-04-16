import AbstractController from "./AbstractController";
import User from "../entities/User";
import Hardware from "../entities/Hardware";
import Response from "../Response";

export default class UserController extends AbstractController {

    // Defines the GET by ID method for a user.
    public get(id: number): Response {
        const user: User = {
            id,
            email: "me@email.com",
            password: "password"
        };

        return new Response(user, 200)
    }

    public associateHardware(data: any, userId: string): Response {
        if (!data.id) {
            return new Response({error: "Expected an id associated with a piece of hardware."}, 400);
        }

        // Mock User for testing.
        const exampleUser: User = {
            id: 1,
            email: "email@email.com",
            password: "password",
            hardware: []
        };

        // Mock Hardware object for testing.
        const exampleHardware: Hardware = {
            id: data.id,
            name: "Example II",
            description: "An example"
        };

        // Push the hardware object ot the User's hardware.
        exampleUser.hardware.push(exampleHardware);

        return new Response(exampleUser,
            201)
    }

    // Defines the POST (creation) for a user.
    public post(data: any): Response {
        if (!((data as User).email)) {
            return new Response({error: "Does not have expected fields for a user."}, 400);
        }

        return new Response({
            id: 1,
            email: data.email
        }, 201);
    }
};