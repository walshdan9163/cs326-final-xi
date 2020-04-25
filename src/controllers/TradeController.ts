// TODO: Define the API methods called from index.ts here. See other controllers for example implementation.

import AbstractController from "./AbstractController";
import User from "../entities/User";
import Hardware from "../entities/Hardware";
// import Software from "../entities/Software";
import Trade from "../entities/Trade";
import Response from "../Response";

export default class TradeController extends AbstractController {
    // defines GET by ID for a trade.
    public get(id: number): Response {
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
        return new Response(trade, 200);
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
        if(!trade.recipient.hardware.find(hardware => hardware.id === mockHardware.id)){
            return new Response("Cannot add duplicate hardware to User.", 400);
        }

        const data = {id: mockHardware.id}
            fetch(`/api/${trade.owner.id}/hardware/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: mockHardware.id}),
            })
                .then((data: any) => {
                    console.log('Successfully deleted hardware from:', data);
                    if(data.id) {
                        trade.accepted = true;
                        return new Response(trade, 200);
                    }
                });

        return new Response('error trading hardware', 400);
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