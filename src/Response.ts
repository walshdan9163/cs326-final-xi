export default class Response {
    constructor(
        protected data: any,
        protected responseCode: number
    ) {
    }

    public toString(): string {
        return JSON.stringify(this.data);
    }
}