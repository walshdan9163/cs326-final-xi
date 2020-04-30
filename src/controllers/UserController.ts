import AbstractController from "./AbstractController";
import User from "../entities/User";
import Response from "../Response";
import UserRepository from "../repositories/UserRepository";

export default class UserController extends AbstractController {

    // Defines the GET by ID method for a user.
    public async get(id: number): Promise<Response> {
        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.read(id);
        return new Response(dbData, 200);
    }

    // Returns a list of software associated with account.
    public async userSoftware(userId: number): Promise<Response> {
        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.readUserSoftware(userId);
        return new Response(dbData, 200)
    }

    // Returns a list of hardware associated with account.
    public async userHardware(userId: number): Promise<Response> {
        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.readUserHardware(userId);
        return new Response(dbData, 200)
    }

    // Returns a list of trades the user is involved in
    public async userTrades(userId: number): Promise<Response> {

        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.readUserTrades(userId);
        return new Response(dbData, 200)
    }

    public async associateHardware(data: any, userId: string): Promise<Response> {
        if (!data.id) {
            return new Response({error: "Expected an id associated with a piece of hardware."}, 400);
        }

        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.relateUserHardware(userId, data.id);
        return new Response(dbData, 200)
    }

    // Associates a piece of software with a user
    public async associateSoftware(data: any, userId: string): Promise<Response> {
        if(!data.id) {
            return new Response({error: "Expected a valid software ID"}, 400);
        }

        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.relateUserSoftware(userId, data.id);
        return new Response(dbData, 200)
    }

    // Delete hardware from user
    public async deleteHardware(data: any, userId: string): Promise<Response> {
        if(!data.id) {
            return new Response({error: "Expected a valid hardware ID"}, 400);
        }

        
        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.deleteUserHardware(userId, data.id);
        return new Response(dbData, 200)
        
    }

    public async deleteSoftware(data: any, userId: string): Promise<Response> {
        if(!data.id) {
            return new Response({error: "Expected a valid software ID"}, 400);
        }

        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.deleteUserSoftware(userId, data.id);
        return new Response(dbData, 200)
    }

    // Defines the POST (creation) for a user.
    public async post(data: any): Promise<Response> {
        if (!((data as User).email)) {
            return new Response({error: "Does not have expected fields for a user."}, 400);
        }

        const repository: UserRepository = new UserRepository();
        const dbData: any = await repository.create(data);
        return new Response(dbData, 200)
    }
};