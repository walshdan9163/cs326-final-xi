import {HomepageHardwareListView} from './HomepageHardwareListView';
import {HomepageSoftwareListView} from './HomepageSoftwareListView';
import {SoftwareItemImageView} from './SoftwareItemImageView';
import {SoftwareItemDescriptionView} from './SoftwareItemDescriptionView';
import {HardwareItemImageView} from './HardwareItemImageView';
import {HardwareItemDescriptionView} from './HardwareItemDescriptionView';

window.addEventListener('load', () => {

    // Makes an API call and calls setState on the homepage's HardwareList.
    // The HardwareList is passed an array of hardware that it uses to render the updated HardwareList.
    const hardwareList = document.getElementById('homepage-hardware-list');
    if(hardwareList){
        const homepageHardwareListView = new HomepageHardwareListView(hardwareList);

        fetch('/api/hardware')
            .then((response) => response.json())
            .then((data) => {
                homepageHardwareListView.setState(data);
            });
    }
    
    // Makes an API call and calls setState on the homepage's SoftwareList.
    // The SoftwareList is passed an array of software that it uses to render the updated SoftwareList.
    const softwareList = document.getElementById('homepage-software-list');
    if(softwareList){
        const homepageSoftwareListView = new HomepageSoftwareListView(softwareList);

        fetch('/api/software')
            .then((response) => response.json())
            .then((data) => {
                homepageSoftwareListView.setState(data);
            });
    }
    
    // Makes an API call and calls setState on the software detail SoftwareDetail box.
    // The softwareItemDescriptionView is passed the name and description of the software item.
    const softwareItemDescription = document.getElementById('software-detail');
    if(softwareItemDescription){
        const softwareItemDescriptionView = new SoftwareItemDescriptionView(softwareItemDescription);

        var url = window.location.href;
        var params = url.split('/');

        fetch('/api/software/' + params.slice(-1)[0])
            .then((response) => response.json())
            .then((data) => {
                softwareItemDescriptionView.setState(data);
            });
    }

    
    const softwareItemImage = document.getElementById('software-detail--image');
    if(softwareItemImage){
        const softwareItemImageView = new SoftwareItemImageView(softwareItemImage);

        var url = window.location.href;
        var params = url.split('/');

        fetch('/api/media/' + params.slice(-1)[0])
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

        var url = window.location.href;
        var params = url.split('/');

        fetch('/api/hardware/' + params.slice(-1)[0])
            .then((response) => response.json())
            .then((data) => {
                hardwareItemDescriptionView.setState(data);
            });
    }

    
    const hardwareItemImage = document.getElementById('hardware-detail--image');
    if(hardwareItemImage){
        const hardwareItemImageView = new HardwareItemImageView(hardwareItemImage);

        var url = window.location.href;
        var params = url.split('/');

        fetch('/api/media/' + params.slice(-1)[0])
            .then((response) => response.json())
            .then((data) => {
                hardwareItemImageView.setState(data);
            });
    }

    
});
