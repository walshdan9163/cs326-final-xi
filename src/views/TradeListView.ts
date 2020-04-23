import { AbstractView } from "./AbstractView";
import Trade from "../entities/Trade";

// TODO: This is where updates to the state of TradeList on User accounts happens. Check the other files for implementation
// TODO: details. This constitutes the basis of the frontend.
export class SoftwareListView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].id &&
            this.state[0].name) {
            return true;
        }

        // If state change is invalid, function returns false.
        return false;
    }

    render(): Element {
        return null;
    }
}