import Tag from "./Tag";
import Media from "./Media";

export default interface Hardware {
    id: number;
    name: string;
    description: string;
    related?: Hardware[];
    tag?: Tag[];
    media?: Media[];
}