import { AbstractView } from "./AbstractView";
import Trade from "../entities/Trade";

// TODO: This is where updates to the state of TradeList on User accounts happens. Check the other files for implementation
// TODO: details. This constitutes the basis of the frontend.
export class TradeListView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].owner &&
            this.state[0].recipient &&
            this.state[0].hardwareToTrade) {
            return true;
        }

        // If state change is invalid, function returns false.
        return false;
    }

    render(): Element {
        const returnElement = document.createElement('div');

        this.state.forEach((trade: Trade) => {
            const listElement = document.createElement('a');
            listElement.classList.add('list-group-item');
            listElement.classList.add('list-group-item-action');
            listElement.innerText = trade.hardwareToTrade.name;
            listElement.href = '/hardware/' + trade.hardwareToTrade.id;

            returnElement.appendChild(listElement);
        });

        return returnElement;
    }
}