import Hardware from "./Hardware";
import Tag from "./Tag";
import Media from "./Media";

export default interface Software {
    id: number;
    name: string;
    description: string;
    related?: Software[];
    hardware?: Hardware[];
    tag?: Tag[];
    media?: Media[];
}