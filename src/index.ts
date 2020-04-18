import express from "express";
import HardwareController from "./controllers/HardwareController";
import SoftwareController from "./controllers/SoftwareController";
import MediaController from "./controllers/MediaController";
import TagController from "./controllers/TagController";
import UserController from "./controllers/UserController";
import Response from "./Response";

import path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname + '/../src/public')));
app.use('/static', express.static(path.resolve(__dirname + '/../src/public/static')));

// Define a route handler for the default home page
app
    .get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/homepage.html'));
    })
    .get("/home", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/homepage.html'));
    })
    .get('/tech', (req,res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/tech.html'));
    })
    .get('/account', (req,res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/accountpage.html'));
    });

// Hardware: Create
app.post("/api/hardware", (req, res) => {
    const controller = new HardwareController();
    const response: Response = controller.post(req.body);

    res.send(response.toString());
});

// Hardware: Get one
app.get("/api/hardware/:hardwareId", (req, res) => {
    const controller = new HardwareController();
    const response: Response = controller.get(parseInt(req.params.hardwareId, 10));

    res.send(response.toString());
});

// Hardware: Get many
app.get("/api/hardware", (req, res) => {
    const controller = new HardwareController();
    const response: Response = controller.getMany();

    res.send(response.toString());
});

// Software: Create
app.post("/api/software", (req, res) => {
    const controller = new SoftwareController();
    const response: Response = controller.post(req.body);

    res.send(response.toString());
});

// Software: Get one
app.get("/api/software/:softwareId", (req, res) => {
    const controller = new SoftwareController();
    const response: Response = controller.get(parseInt(req.params.softwareId, 10));

    res.send(response.toString());
});

// Software: Get many
app.get("/api/software", (req, res) => {
    const controller = new SoftwareController();
    const response: Response = controller.getMany();

    res.send(response.toString());
});

// Media: Create
app.post("/api/media", (req, res) => {
    const controller = new MediaController();
    const response: Response = controller.post(req.body);

    res.send(response.toString());
});

// Tag: Create
app.post("/api/tag", (req, res) => {
    const controller = new TagController();
    const response: Response = controller.post(req.body);

    res.send(response.toString());
});

// User: Create
app.post("/api/user", (req, res) => {
    const controller = new UserController();
    const response: Response = controller.post(req.body);

    res.send(response.toString());
});

// User: Get one
app.get("/api/user/:userId", (req, res) => {
    const controller = new UserController();
    const response: Response = controller.get(parseInt(req.params.userId, 10));

    res.send(response.toString());
});

// User: Associate hardware to user account.
app.post("/api/:userId/hardware", (req, res) => {
   const controller = new UserController();
   const response: Response = controller.associateHardware(req.body, req.params.userId);

   res.send(response.toString());
});

// User: Associate software to user account.
app.post("/api/:userId/software", (req, res) => {
    const controller = new UserController();
    const response: Response = controller.associateSoftware(req.body, req.params.userId);

    res.send(response.toString());
});

// User: Delete (un-associate) hardware from user account.
app.post("/api/:userId/hardware/delete", (req, res) => {
    const controller = new UserController();
    const response: Response = controller.deleteHardware(req.body, req.params.userId);

    res.send(response.toString());
});

// User: Delete (un-associate) software from user account.
app.post("/api/:userId/software/delete", (req, res) => {
    const controller = new UserController();
    const response: Response = controller.deleteSoftware(req.body, req.params.userId);

    res.send(response.toString());
});

// Media: Delete by ID.
app.post("/api/:mediaId/delete", (req, res) => {
    const controller = new MediaController();
    const response: Response = controller.delete(req.params.mediaId);

    res.send(response.toString());
});

app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/404.html'));
    });

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
} );