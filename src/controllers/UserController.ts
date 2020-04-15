import AbstractController from "./AbstractController";
import User from "../entities/User";
import Response from "../Response";

export default class UserController extends AbstractController {

    // Defines the GET method for a user.
    public get(id: number): Response {
        const user: User = {
            id,
            email: "me@email.com",
            password: "password"
        };

        return new Response(user, 200)
    }

    // Defines the POST (creation) for a user.
    public post(data: any): Response {
        if (!((data as User).email)) {
            return new Response({error: "Does not have expected fields for a user."}, 400);
        }

        return new Response({
            id: 1
        }, 201);
    }
};