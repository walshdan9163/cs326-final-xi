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
        if (!(data.owneremail && data.recipid && data.techid)) {
            return new Response({error: "Does not have expected fields for a trade."}, 400);
        }

        const repository: TradeRepository = new TradeRepository();
        const userRepository: UserRepository = new UserRepository();

        const owner: User = await userRepository.readUserByEmail(data.owneremail);
        console.log(owner);
        if(!owner.id) {
            return new Response("Owner does not exist", 400);
        }

        const trade: any = {
            ownerid: owner.id,
            recipid: data.recipid,
            techid: data.techid
        }

        const dbData: any = await repository.create(trade);
        return new Response(dbData, 200);
    }

    // defines UPDATE method for accepting a trade
    public async accept(tradeId: number): Promise<Response> {
        const repository: TradeRepository = new TradeRepository();
        const userRepository: UserRepository = new UserRepository();
        let dbData: any = await repository.read(tradeId);
        let trade: Trade = dbData as Trade;

        if(!trade.ownerid) {
            return new Response("Trade does not exist", 400);
        }

        // Ensures recipient doesn't already have the hardware
        dbData = await userRepository.readUserHardware(trade.recipid);
        const recipHardware: Hardware[] = dbData as Hardware[];
        if(recipHardware.find(hardware => hardware.id === trade.techid)){
            return new Response("Cannot add duplicate hardware to User.", 400);
        }

        // Finds the index of the hardware to delete from the user and removes it.
        dbData = await userRepository.readUserHardware(trade.ownerid);
        const ownerHardware: Hardware[] = dbData as Hardware[];
        const index: number = ownerHardware.findIndex(hardwareToDelete => hardwareToDelete.id === trade.techid);
        if(index > -1) {
            trade.accept = true;
            await repository.update(trade.id);
            await userRepository.deleteUserHardware(''+trade.ownerid, trade.techid);
            await userRepository.relateUserHardware(''+trade.recipid, trade.techid);
            return new Response(trade, 200);
        }

        return new Response("Owner does not have this hardware", 400);
    }

    // defines delete for if a trade is rejected
    public async delete(id: number): Promise<Response> {
        
        const repository: TradeRepository = new TradeRepository();
        const dbData = await repository.delete(id);

        return new Response(dbData, 200);
    }
}