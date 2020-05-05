import User from "./User";
import Hardware from "./Hardware";

export default interface Trade {
    id: number;
    ownerid: number;
    recipid: number;
    techid: number;
    accept: boolean;
}