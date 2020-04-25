import { AbstractView } from "./AbstractView";
import Trade from "../entities/Trade";

export class TradeListView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].id &&
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
            let innerText: string = (trade.accepted ? 'PENDING: ' : '') + trade.hardwareToTrade.name;
            listElement.innerText = innerText;
            listElement.href = '/trade/' + trade.id;

            returnElement.appendChild(listElement);
        });

        return returnElement;
    }

    handleTrade(trade: Trade) {
        alert(trade.hardwareToTrade);
    }
}