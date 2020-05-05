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
            this.state[0].ownerid &&
            this.state[0].recipid &&
            this.state[0].techid) {
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
            (async () => {
                let hardwareName: String;
                await fetch('/api/hardware/' + trade.techid)
                .then((response) => response.json())
                .then((data) => {
                    if((data as Hardware).name) {
                        hardwareName = data.name;
                    }
                });
                let innerText: string = (trade.accept ? 'COMPLETED: ' : 'PENDING: ') + hardwareName;
                listElement.innerText = innerText;
                listElement.href = '/trade/' + trade.id;

                returnElement.appendChild(listElement);
            })();
        });

        return returnElement;
    }

    handleTrade(trade: Trade) {
        alert(trade.techid);
    }
}