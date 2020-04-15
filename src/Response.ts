// Defines the structure of a response (what will be returned back to the user from any API call).
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