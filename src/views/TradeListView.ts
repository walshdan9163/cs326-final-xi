import { AbstractView } from "./AbstractView";
import Trade from "../entities/Trade";
import Hardware from "../entities/Hardware";
import HardwareController from "../controllers/HardwareController";
import Response from "../Response";


export class TradeListView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].id &&
            this.state[0].ownerId &&
            this.state[0].recipId &&
            this.state[0].hardwareId) {
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
            const controller: HardwareController = new HardwareController();
            let hardwareName: String;
            fetch('/api/hardware/' + trade.hardwareId)
            .then((response) => response.json())
            .then((data) => {
                if((data as Hardware).name) {
                    hardwareName = data.name;
                }
            });
            let innerText: string = (trade.accept ? 'PENDING: ' : '') + hardwareName;
            listElement.innerText = innerText;
            listElement.href = '/trade/' + trade.id;

            returnElement.appendChild(listElement);
        });

        return returnElement;
    }

    handleTrade(trade: Trade) {
        alert(trade.hardwareId);
    }
}