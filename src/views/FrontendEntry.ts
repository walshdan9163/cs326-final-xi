import {HardwareListView} from './HardwareListView';
import {SoftwareListView} from './SoftwareListView';
import {SoftwareItemImageView} from './SoftwareItemImageView';
import {SoftwareItemDescriptionView} from './SoftwareItemDescriptionView';
import {HardwareItemImageView} from './HardwareItemImageView';
import {HardwareItemDescriptionView} from './HardwareItemDescriptionView';

window.addEventListener('load', () => {

    // Makes an API call and calls setState on the homepage's HardwareList.
    // The HardwareList is passed an array of hardware that it uses to render the updated HardwareList.
    const homepageHardwareList = document.getElementById('homepage-hardware-list');
    if(homepageHardwareList){
        const homepageHardwareListView = new HardwareListView(homepageHardwareList);

        fetch('/api/hardware')
            .then((response) => response.json())
            .then((data) => {
                homepageHardwareListView.setState(data);
            });
    }

    const accountHardwareList = document.getElementById('account-hardware-list');
    if(accountHardwareList){
        const accountHardwareListView = new HardwareListView(accountHardwareList);

        fetch("/api/user/1/hardware")
            .then((response) => response.json())
            .then((data) => {
                accountHardwareListView.setState(data);
            });
    }
    
    // Makes an API call and calls setState on the homepage's SoftwareList.
    // The SoftwareList is passed an array of software that it uses to render the updated SoftwareList.
    const homepageSoftwareList = document.getElementById('homepage-software-list');
    if(homepageSoftwareList){
        const homepageSoftwareListView = new SoftwareListView(homepageSoftwareList);

        fetch('/api/software')
            .then((response) => response.json())
            .then((data) => {
                homepageSoftwareListView.setState(data);
            });
    }
    
    const accountSoftwareList = document.getElementById('account-software-list');
    if(accountSoftwareList){
        const accountSoftwareListView = new SoftwareListView(accountSoftwareList);

        fetch("/api/user/1/software")
            .then((response) => response.json())
            .then((data) => {
                accountSoftwareListView.setState(data);
            });
    }

    // Makes an API call and calls setState on the software detail SoftwareDetail box.
    // The softwareItemDescriptionView is passed the name and description of the software item.
    const softwareItemDescription = document.getElementById('software-detail');
    if(softwareItemDescription){
        const softwareItemDescriptionView = new SoftwareItemDescriptionView(softwareItemDescription);

        const currentUrl = window.location.pathname;
        const params = currentUrl.split('/');

        fetch('/api/software/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                softwareItemDescriptionView.setState(data);
            });
    }

    
    const softwareItemImage = document.getElementById('software-detail--image');
    if(softwareItemImage){
        const softwareItemImageView = new SoftwareItemImageView(softwareItemImage);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        fetch('/api/media/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                softwareItemImageView.setState(data);
            });
    }

    // Makes an API call and calls setState on the hardware detail hardwareDetail box.
    // The hardwareItemDescriptionView is passed the name and description of the hardware item.
    const hardwareItemDescription = document.getElementById('hardware-detail');
    if(hardwareItemDescription){
        const hardwareItemDescriptionView = new HardwareItemDescriptionView(hardwareItemDescription);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        fetch('/api/hardware/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                hardwareItemDescriptionView.setState(data);
            });
    }

    
    const hardwareItemImage = document.getElementById('hardware-detail--image');
    if(hardwareItemImage){
        const hardwareItemImageView = new HardwareItemImageView(hardwareItemImage);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        fetch('/api/media/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                hardwareItemImageView.setState(data);
            });
    }

    // Associates a piece of hardware to a user account.
    const addHardwareButton = document.getElementById('hardware-add-button');
    if(addHardwareButton) {
        addHardwareButton.addEventListener('click', () => {
            // Will need to get userId properly later.
            const userId: string = "1";
            const currentUrl: string = window.location.pathname;

            const hardwareToAdd = currentUrl.split('/')[2];
            const data = { id: hardwareToAdd };

            fetch(`/api/${userId}/hardware`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: Response) => response.json())
                .then((data) => console.log('Successfully added hardware to:', data));
        });
    }

    // Un-associates a piece of hardware from a user account.
    const deleteHardwareButton = document.getElementById('hardware-delete-button');
    if(deleteHardwareButton) {
        deleteHardwareButton.addEventListener('click', () => {
            // Will need to get userId properly later.
            const userId: string = "1";
            const currentUrl: string = window.location.pathname;

            const hardwareToDelete = currentUrl.split('/')[2];
            const data = { id: hardwareToDelete };

            fetch(`/api/${userId}/hardware/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: Response) => response.json())
                .then((data) => console.log('Successfully deleted hardware from:', data));
        })
    }

    // Associates a piece of software to a user account.
    const addSoftwareButton = document.getElementById('software-add-button');
    if(addSoftwareButton) {
        addSoftwareButton.addEventListener('click', () => {
            // Will need to get userId properly later.
            const userId: string = "1";
            const currentUrl: string = window.location.pathname;

            const softwareToAdd = currentUrl.split('/')[2];
            const data = { id: softwareToAdd };

            fetch(`/api/${userId}/software`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: Response) => response.json())
                .then((data) => console.log('Successfully added software to:', data));
        });
    }

    // Un-associates a piece of software from a user account.
    const deleteSoftwareButton = document.getElementById('software-delete-button');
    if(deleteSoftwareButton) {
        deleteSoftwareButton.addEventListener('click', () => {
            // Will need to get userId properly later.
            const userId: string = "1";
            const currentUrl: string = window.location.pathname;

            const softwareToDelete = currentUrl.split('/')[2];
            const data = { id: softwareToDelete };

            fetch(`/api/${userId}/software/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: Response) => response.json())
                .then((data) => console.log('Successfully deleted software from:', data));
        })
    }
});
