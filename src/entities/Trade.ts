import User from "./User";
import Hardware from "./Hardware";

export default interface Trade {
    id: number;
    owner: User;
    recipient: User;
    hardwareToTrade: Hardware;
    accepted: boolean;
}