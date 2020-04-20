import Tag from "./Tag";
import Media from "./Media";

export default interface Hardware {
    id: number;
    name: string;
    description: string;
    tag?: Tag[];
    media?: Media[];
}