import Cookies from 'js-cookie';
import {HardwareListView} from './HardwareListView';
import {TradeListView} from './TradeListView';
import {SoftwareListView} from './SoftwareListView';
import {SoftwareItemImageView} from './SoftwareItemImageView';
import {SoftwareItemDescriptionView} from './SoftwareItemDescriptionView';
import {HardwareItemImageView} from './HardwareItemImageView';
import {HardwareItemDescriptionView} from './HardwareItemDescriptionView';
import {TradeDescriptionView} from './TradeDescriptionView';
import Trade from '../entities/Trade';

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

    // Hooks up account trade list
    const accountTradeList = document.getElementById('account-trade-list');
    if(accountTradeList) {
        const accountTradeListView = new TradeListView(accountTradeList);

        fetch("/api/user/1/trade")
            .then((response) => response.json())
            .then((data) => {
                accountTradeListView.setState(data);
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

    // Loads the image for the piece of software.
    const softwareItemImage = document.getElementById('software-detail--image');
    if(softwareItemImage){
        const softwareItemImageView = new SoftwareItemImageView(softwareItemImage);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        let mediaId: string = "";

        fetch(`/api/software/${params[2]}/media`)
            .then((response) => response.json())
            .then((data) => {
                if(data != null){
                    mediaId = data.mediaid;
                    fetch('/api/media/' + mediaId)
                        .then((response) => response.json())
                        .then((data) => {
                            softwareItemImageView.setState(data);
                        });
                }
                else{
                    softwareItemImageView.setState({"URL":"https://i1.wp.com/jasonfarman.com/delayedresponse/wp-content/uploads/2017/06/hour-glass.gif", "name":"No image"});
                }
            })
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

    // Loads the image for the piece of hardware.
    const hardwareItemImage = document.getElementById('hardware-detail--image');
    if(hardwareItemImage){
        const hardwareItemImageView = new HardwareItemImageView(hardwareItemImage);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        let mediaId: string = "";
        

        fetch(`/api/hardware/${params[2]}/media`)
            .then((response) => response.json())
            .then((data) => {
                if(data != null){
                    mediaId = data.mediaid;
                    fetch('/api/media/' + mediaId)
                        .then((response) => response.json())
                        .then((data) => {
                            hardwareItemImageView.setState(data);
                        });
                }
                else{
                    hardwareItemImageView.setState({"URL":"https://i1.wp.com/jasonfarman.com/delayedresponse/wp-content/uploads/2017/06/hour-glass.gif", "name":"No image"});
                }
            })
    }

    // Loads the description of the trade.
    const tradeDescription = document.getElementById('trade-detail');
    if(tradeDescription) {
        const tradeDescriptionView = new TradeDescriptionView(tradeDescription);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        fetch('/api/trade/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                tradeDescriptionView.setState(data)
            });
    }

    const tradeItemDescription = document.getElementById('trade-hardware-detail');
    if(tradeItemDescription){
        const tradeItemDescriptionView = new HardwareItemDescriptionView(tradeItemDescription);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');
        // let trade: Trade;

        /* fetch('/api/trade/' + params[2])
            .then((response) => console.log(response.json()))
            .then((data) => trade = ((data as unknown) as Trade)); */

        fetch('/api/hardware/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                tradeItemDescriptionView.setState(data);
            });
    }

    
    const tradeItemImage = document.getElementById('trade-hardware-detail--image');
    if(tradeItemImage){
        const tradeItemImageView = new HardwareItemImageView(tradeItemImage);

        const currentUrl: string = window.location.pathname;
        const params: string[] = currentUrl.split('/');

        fetch('/api/media/' + params[2])
            .then((response) => response.json())
            .then((data) => {
                tradeItemImageView.setState(data);
            });
    }

    const userLogin = document.getElementById('login-button');
    if(userLogin) {
        userLogin.addEventListener('click', () => {
            const userEmail: string = (<HTMLInputElement>document.getElementById('register-email')).value;
            const userPassword: string = (<HTMLInputElement>document.getElementById('register-password')).value;

            if(userEmail === "" || userPassword === ""){
                alert("Please fill out both fields.");
            }
            else {
                const data: any = {
                    email: userEmail,
                    password: userPassword
                }

                fetch(`/api/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response: Response) => response.json())
                    .then((data) => {
                        if(data.id) {
                            alert("Successfully Logged In.");

                            Cookies.set('token', data.token);
                            Cookies.set('user-id', data.id);

                            location.pathname = '/account';
                        } else {
                            alert("Incorrect email or password.");
                        }
                    });
            }
        })
    }

    const userRegister = document.getElementById('register-button');
    if(userRegister){
        userRegister.addEventListener('click', () => {
            const userEmail: string = (<HTMLInputElement>document.getElementById('register-email')).value;
            const userPassword: string = (<HTMLInputElement>document.getElementById('register-password')).value;

            if(userEmail === "" || userPassword === ""){
                
                alert("Invalid Email or Password")
            }
            else{
                // TODO Verify that those are legitimate
                const data: any = {email : userEmail, password: userPassword};

                fetch(`/api/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response: Response) => response.json())
                    .then((data) => {
                        if(data.id) {
                            alert("Successfully Registered.");
                            location.pathname = '/home';
                        }
                    });
            }
            
        })
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
                .then((data) => {
                    console.log('Successfully added hardware to:', data);
                    if(data.id) {
                        alert("Successfully Added Hardware to Account.");
                    }
                });
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
                .then((data) => {
                    console.log('Successfully deleted hardware from:', data);
                    if(data.id) {
                        alert("Successfully Deleted Hardware from Account.");
                    }
                });
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
                .then((data) => {
                    console.log('Successfully added software to:', data);
                    if(data.id) {
                        alert("Successfully Added Software to Account.");
                    }
                });
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
                .then((data) => {
                    console.log('Successfully deleted software from:', data);
                    if(data.id) {
                        alert("Successfully Deleted Hardware from Account.");
                    }
                });
        })
    }

    // Creates new trade
    const createTradeButton = document.getElementById('create-trade-button');
    if(createTradeButton) {
        createTradeButton.addEventListener('click', () => {
            /* const currentUrl: string = window.location.pathname;
            const hardwareId = currentUrl.split('/')[2];
            const ownerId = "1" */
            // change this with actual DB
            const data: Trade = {
                id: 1,
                owner: {
                    id: 1,
                    email: 'user1@user.com',
                    password: 'password'
                },
                recipient: {
                    id: 2,
                    email: 'toddhoward@bethesda.net',
                    password: 'skyrim'
                },
                hardwareToTrade: {
                    id: 1,
                    name: "Apple II",
                    description: "The Apple II"
                },
                accepted: false
            };

            fetch('/api/trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(data),
            })
                .then((response: Response) => response.json())
                .then((data) => {
                    console.log('Successfully created trade for:', data);
                    if(data.id) {
                        alert("Successfully Created Trade.");
                    }
                });
        });
    }

    // Accepts pending trade
    const acceptTradeButton = document.getElementById('trade-accept-button');
    if(acceptTradeButton) {
        acceptTradeButton.addEventListener('click', () => {
            const currentUrl: string = window.location.pathname;

            const tradeId = currentUrl.split('/')[2];

            fetch(`/api/trade/${tradeId}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response: Response) => response.json())
                .then((data) => {
                    console.log('Successfully added hardware to:', data);
                    if(data.id) {
                        alert("Successfully Accepted Trade.");
                    }
                });
        });
    }

    // Rejects pending trade
    const declineTradeButton = document.getElementById('trade-decline-button');
    if(declineTradeButton) {
        declineTradeButton.addEventListener('click', () => {
            const currentUrl: string = window.location.pathname;

            const tradeId = currentUrl.split('/')[2];

            fetch(`/api/trade/${tradeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response: Response) => response.json())
                .then((data) => {
                    console.log('Successfully deleted hardware from:', data);
                    if(data.id) {
                        alert("Successfully Declined Trade.");
                    }
                });
        })
    }

});
