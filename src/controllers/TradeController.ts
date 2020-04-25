import AbstractController from "./AbstractController";
import User from "../entities/User";
import Hardware from "../entities/Hardware";
// import Software from "../entities/Software";
import Trade from "../entities/Trade";
import Response from "../Response";

export default class TradeController extends AbstractController {
    // defines GET by ID for a trade.
    public get(id: number): Response {
        const trades: Trade[] = [
            {
            id: 1,
            owner: {
                id: 1,
                email: 'user1@user.com',
                password: 'password'
            },
            recipient: {
                id: 2,
                email: 'toddhoward@bethesda.net',
                password: 'skyrim'
            },
            hardwareToTrade: {
                id: 1,
                name: "Apple II",
                description: "The Apple II"
            },
            accepted: false
        },
        {
            id: 2,
            owner: {
                id: 2,
                email: 'toddhoward@bethesda.net',
                password: 'skyrim'
            },
            recipient: {
                id: 1,
                email: 'user1@user.com',
                password: 'password'
            },
            hardwareToTrade: {
                id: 2,
                name: "IBM PC",
                description: "The IBM PC"
            },
            accepted: false
        }
    ];
    return new Response(trades.find(trade => trade.id === id), 200);

    }

    // defines POST for creation of new trades
    public post(data: any): Response {
        if (!(data as Trade).owner) {
            return new Response({error: "Does not have expected fields for a trade."}, 400);
        }

        return new Response({
            id: 1,
            owner: {
                id: 1,
                email: 'user1@user.com',
                password: 'password'
            },
            recipient: {
                id: 2,
                email: 'toddhoward@bethesda.net',
                password: 'skyrim'
            },
            hardwareToTrade: {
                id: 1,
                name: "Apple II",
                description: "The Apple II"
            },
            accepted: false
        }, 201);
    }

    // defines UPDATE method for accepting a trade
    public accept(id: number): Response {
        // mock hardware for testing
        const mockHardware: Hardware = {
            id: 1,
            name: "Apple Newton",
            description: "Apple PDA"
        };

        const trade: Trade = {
            id: 1,
            owner: {
                id: 1,
                email: 'user1@user.com',
                password: 'password',
                hardware: [mockHardware]
            },
            recipient: {
                id: 2,
                email: 'toddhoward@bethesda.net',
                password: 'skyrim',
                hardware: []
            },
            hardwareToTrade: mockHardware,
            accepted: false
        }

        // Ensures recipient doesn't already have the hardware
        if(trade.recipient.hardware.find(hardware => hardware.id === mockHardware.id)){
            return new Response("Cannot add duplicate hardware to User.", 400);
        }

        // Finds the index of the hardware to delete from the user and removes it.
        const index: number = trade.owner.hardware.findIndex(hardwareToDelete => hardwareToDelete.id === trade.hardwareToTrade.id);
        if(index > -1) {
            trade.owner.hardware.splice(index, 1);
            trade.accepted = true;
            return new Response(trade, 200);
        }

        return new Response("User does not have this hardware", 400);
    }

    // defines delete for if a trade is rejected
    public delete(id: number): Response {
        const trade: Trade = {
            id: 1,
            owner: {
                id: 1,
                email: 'user1@user.com',
                password: 'password'
            },
            recipient: {
                id: 2,
                email: 'toddhoward@bethesda.net',
                password: 'skyrim'
            },
            hardwareToTrade: {
                id: 1,
                name: "Apple II",
                description: "The Apple II"
            },
            accepted: false
        }

        if(id !== trade.id) {
            return new Response({error: "Expected a valid trade ID"}, 400);
        }

        // delete

        return new Response(trade, 200);
    }
}