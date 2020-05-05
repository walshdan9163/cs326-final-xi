import { AbstractView } from "./AbstractView";
import User from "../entities/User";

export class TradeDescriptionView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state.id &&
            this.state.ownerid &&
            this.state.recipid &&
            this.state.techid) {
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
        let icon = document.createElement('i');
        icon.setAttribute('data-feather', 'phone-call');
        itemHeader.appendChild(icon); //TODO fix this
        itemHeader.innerText = this.state["accept"] ? 'COMPLETED' : 'PENDING';
        itemHeader.classList.add('card-title');
        item.appendChild(itemHeader);

        (async () => {

        
        let owner: User;
        let recip: User;

        await fetch(`/api/user/${this.state.ownerid}`)
            .then((response) => response.json())
            .then((data) => {
                owner = data as User;
            });
        await fetch(`/api/user/${this.state.recipid}`)
            .then((response) => response.json())
            .then((data) => {
                recip = data as User;
            });

        // add trade details
        const description = document.createElement('p');
        description.innerHTML = 
            'Owner: ' + owner.email + `<br>` +
            'Recipient: ' + recip.email + `<br>`;
        description.classList.add('card-text');
        item.appendChild(description);

        returnElement.appendChild(item);
        })();
        return returnElement;
    }
}