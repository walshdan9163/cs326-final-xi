import { AbstractView } from "./AbstractView";

export class TradeDescriptionView extends AbstractView {
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

        const item = document.createElement('div');

        // add trade header
        const itemHeader = document.createElement('h5');
        itemHeader.innerText = this.state["accepted"] ? 'COMPLETED' : 'PENDING';
        const icon = document.createElement('i'); // TODO Change icon later
        itemHeader.classList.add('card-title');
        item.appendChild(itemHeader);

        // add trade details
        const description = document.createElement('p');
        description.innerHTML = 
            'Owner: ' + this.state["owner"].email + `<br>` +
            'Recipient: ' + this.state["recipient"].email + `<br>`;
        description.classList.add('card-text');
        item.appendChild(description);

        returnElement.appendChild(item);

        return returnElement;
    }
}