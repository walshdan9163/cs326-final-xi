import AbstractController from "./AbstractController";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository"
import Hardware from "../entities/Hardware";
// import Software from "../entities/Software";
import Trade from "../entities/Trade";
import Response from "../Response";
import TradeRepository from "../repositories/TradeRepository";

export default class TradeController extends AbstractController {
    // defines GET by ID for a trade.
    public async get(id: number): Promise<Response> {
        const repository: TradeRepository = new TradeRepository();
        const dbData: any = await repository.read(id);
        return new Response(dbData, 200);

    }

    // defines POST for creation of new trades
    public async post(data: any): Promise<Response> {
        if (!(data as Trade).ownerId) {
            return new Response({error: "Does not have expected fields for a trade."}, 400);
        }

        const repository: TradeRepository = new TradeRepository();
        const dbData: any = await repository.create(data);
        return new Response(dbData, 200);
    }

    // defines UPDATE method for accepting a trade
    public async accept(tradeId: number): Promise<Response> {
        const repository: TradeRepository = new TradeRepository();
        const userRepository: UserRepository = new UserRepository();
        let dbData: any = await repository.read(tradeId);
        let trade: Trade = dbData as Trade;

        if(!trade.ownerId) {
            return new Response("Trade does not exist", 400);
        }

        dbData = await userRepository.read(trade.ownerId);
        const owner = dbData as User;
        dbData = await userRepository.read(trade.recipId);
        const recipient = dbData as User;

        // Ensures recipient doesn't already have the hardware
        if(recipient.hardware.find(hardware => hardware.id === trade.hardwareId)){
            return new Response("Cannot add duplicate hardware to User.", 400);
        }

        // Finds the index of the hardware to delete from the user and removes it.
        dbData = await userRepository.readUserHardware(owner.id);
        const ownerHardware: any[] = dbData;
        const index: number = ownerHardware.findIndex(hardwareToDelete => hardwareToDelete.id === trade.hardwareId);
        if(index > -1) {
            owner.hardware.splice(index, 1);
            trade.accept = true;
            await userRepository.deleteUserHardware(''+trade.ownerId, trade.hardwareId);
            await userRepository.relateUserHardware(''+trade.recipId, trade.hardwareId);
            return new Response(trade, 200);
        }

        return new Response("Owner does not have this hardware", 400);
    }

    // defines delete for if a trade is rejected
    public async delete(id: number): Promise<Response> {
        
        const repository: TradeRepository = new TradeRepository();
        await repository.delete(id);

        return new Response("Trade rejected", 200);
    }
}