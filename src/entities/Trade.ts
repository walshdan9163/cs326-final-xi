import User from "./User";
import Hardware from "./Hardware";

export default interface Trade {
    owner: User;
    recipient: User;
    hardwareToTrade: Hardware;
    accepted: boolean;
}