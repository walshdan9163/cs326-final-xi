import express from "express";
import HardwareController from "./controllers/HardwareController";
import SoftwareController from "./controllers/SoftwareController";
import Response from "./Response";

const app = express();
const port = 8080; // default port to listen

app.use(express.json());

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send( "Hello world!" );
} );

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

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
} );