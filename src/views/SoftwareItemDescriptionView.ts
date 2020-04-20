import { AbstractView } from "./AbstractView";
import Software from "../entities/Software";

export class SoftwareItemDescriptionView extends AbstractView {
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

        // // Make and append the item list.
        const relatedList = this.state["related"];
        relatedList.forEach((related: Software) => {
            const listElement = document.createElement('a');
            listElement.classList.add('list-group-item');
            listElement.classList.add('list-group-item-action');
            listElement.innerText = related.name;
            listElement.href = '/software/' + related.id;
            listGroup.appendChild(listElement);
        });

        returnElement.appendChild(listGroup);
        
        return returnElement;
    }
}

