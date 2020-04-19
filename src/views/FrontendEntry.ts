import {HomepageHardwareListView} from './HomepageHardwareListView';
import {HomepageSoftwareListView} from './HomepageSoftwareListView';

window.addEventListener('load', () => {
    const homepageHardwareListView = new HomepageHardwareListView(document.getElementById('hardware-list'));

    // Makes an API call and calls setState on the homepage's HardwareList.
    // The HardwareList is passed an array of hardware that it uses to render the updated HardwareList.
    fetch('/api/hardware')
        .then((response) => response.json())
        .then((data) => {
            homepageHardwareListView.setState(data);
        });

    const homepageSoftwareListView = new HomepageSoftwareListView(document.getElementById('software-list'));

    fetch('/api/software')
        .then((response) => response.json())
        .then((data) => {
            homepageSoftwareListView.setState(data);
        });
});
