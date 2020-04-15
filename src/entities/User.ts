import Hardware from "./hardware";
import Software from "./software";

export default interface User {
    id: number;
    email: string;
    hardware?: Hardware[];
    software?: Software[];
}