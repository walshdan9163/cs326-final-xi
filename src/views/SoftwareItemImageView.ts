import { AbstractView } from "./AbstractView";
import Media from "../entities/Media";

export class SoftwareItemImageView extends AbstractView {
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
        const returnElement = document.createElement('div');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = this.state["URL"];
        image.alt = this.state["name"];

        returnElement.appendChild(image);
        
        return returnElement;
    }
}

