import Hardware from "./Hardware";
import Software from "./Software";

export default interface User {
    id: number;
    email: string;
    password: string;
    hardware?: Hardware[];
    software?: Software[];
}