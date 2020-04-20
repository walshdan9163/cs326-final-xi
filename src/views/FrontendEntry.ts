import {HomepageHardwareListView} from './HomepageHardwareListView';
import {HomepageSoftwareListView} from './HomepageSoftwareListView';
import {SoftwareItemImageView} from './SoftwareItemImageView';
import {SoftwareItemDescriptionView} from './SoftwareItemDescriptionView';

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

    
});
