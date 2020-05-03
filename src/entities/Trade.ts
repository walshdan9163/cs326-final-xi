import User from "./User";
import Hardware from "./Hardware";

export default interface Trade {
    id: number;
    ownerId: number;
    recipId: number;
    hardwareId: number;
    accept: boolean;
}