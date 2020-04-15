import Tag from "./Tag";

export default interface Media {
    id: number;
    name: string;
    URL: string;
    tag?: Tag[];
}