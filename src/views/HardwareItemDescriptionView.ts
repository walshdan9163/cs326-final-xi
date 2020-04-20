import { AbstractView } from "./AbstractView";

export class HardwareItemDescriptionView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].id &&
            this.state[0].name &&
            this.state[0].description) {
            return true;
        }

        // If state change is invalid, function returns false.
        return false;
    }


    render(): Element {

        const returnElement = document.createElement('div');

        const item = document.createElement('div');

        // Make and append the item header.
        const itemHeader = document.createElement('h5');
        itemHeader.innerText = this.state["name"];
        const icon = document.createElement('i'); // Should add icon used on hardware page
        itemHeader.classList.add('card-title');
        item.appendChild(itemHeader);

        // Make and append the item description.
        const itemDescription = document.createElement('p');
        itemDescription.innerHTML = this.state["description"];
        itemDescription.classList.add('card-text');
        item.appendChild(itemDescription);

        // Append header and description to returned element.
        returnElement.appendChild(item);

        const listGroup = document.createElement('div');
        listGroup.classList.add('list-group');

        returnElement.appendChild(listGroup);
        
        return returnElement;
    }
}

