import UserRepository from "./repositories/UserRepository";

require('dotenv').config();
import express from "express";
import cookieParser from "cookie-parser";
import HardwareController from "./controllers/HardwareController";
import SoftwareController from "./controllers/SoftwareController";
import MediaController from "./controllers/MediaController";
import TagController from "./controllers/TagController";
import UserController from "./controllers/UserController";
import Response from "./Response";

import path = require('path');
import TradeController from "./controllers/TradeController";
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.resolve(__dirname + '/../src/public')));
app.use('/static', express.static(path.resolve(__dirname + '/../src/public/static')));
app.use('/js', express.static(path.resolve(__dirname + '/../dist-frontend')));


// Define a route handler for the default home page
app
    .get("/", (req, res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/homepage.html'));
        }, (res) => {
            res.redirect('/login')
        })
    })
    .get("/home", (req, res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/homepage.html'));
        }, (res) => {
            res.redirect('/login')
        })
    })
    .get("/login", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/login.html'));
    })
    .get("/register", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/register.html'));
    })
    .get('/hardware/:hardwareId', (req,res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/hardware.html'));
        }, (res) => {
            res.redirect('/login')
        })
    })
    .get('/software/:softwareId', (req,res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/software.html'));
        }, (res) => {
            res.redirect('/login')
        })
    })
    .get('/account', (req,res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/accountpage.html'));
        }, (res) => {
            res.redirect('/login')
        })
    })
    .get('/trade/:tradeId', (req,res) => {
        validate(req, res, (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + '/../src/public/views/trade.html'));
        }, (res) => {
            res.redirect('/login')
        })
    });

type validCallbackFunction = (req: express.Request, res: express.Response) => void;
type invalidCallbackFunction = (res: express.Response) => void | null;
const validate = (req: express.Request, res: express.Response, validCallback: validCallbackFunction, invalidCallback: invalidCallbackFunction = null) => {
    if (!invalidCallback) {
        invalidCallback = (res: express.Response) => {
            res.status(301).send({error: 'Incorrect or missing authorization cookies.'})
        }
    }

    if (!req.cookies['user-id'] && !req.cookies.token) {
        invalidCallback(res);
    }

    const userRepository = new UserRepository();

    userRepository.validateToken(req.cookies['user-id'], req.cookies.token)
        .then((valid) => {
            if (valid) {
                validCallback(req, res)
            }
            else {
                invalidCallback(res)
            }
        });
}

// Hardware: Create
app.post("/api/hardware", (req, res) => {
    const controller = new HardwareController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Hardware: Get one
app.get("/api/hardware/:hardwareId", (req, res) => {
    const controller = new HardwareController();
    controller.get(parseInt(req.params.hardwareId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Hardware: Get many
app.get("/api/hardware", (req, res) => {
    const controller = new HardwareController();
    controller.getMany()
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Software: Create
app.post("/api/software", (req, res) => {
    const controller = new SoftwareController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Software: Get one
app.get("/api/software/:softwareId", (req, res) => {
    const controller = new SoftwareController();
    controller.get(parseInt(req.params.softwareId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Software: Get many
app.get("/api/software", (req, res) => {
    const controller = new SoftwareController();
    controller.getMany()
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Media: Create
app.post("/api/media", (req, res) => {
    const controller = new MediaController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Media: Get one
app.get("/api/media/:mediaId", (req, res) => {
    const controller = new MediaController();
    controller.get(parseInt(req.params.mediaId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Media: Get ID of media related to software ID
app.get("/api/software/:softwareId/media", (req, res) => {
    const controller = new SoftwareController();
    controller.getRelatedMedia(parseInt(req.params.softwareId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Media: Get ID of media related to hardware ID
app.get("/api/hardware/:hardwareId/media", (req, res) => {
    const controller = new HardwareController();
    controller.getRelatedMedia(parseInt(req.params.hardwareId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Tag: Create
app.post("/api/tag", (req, res) => {
    const controller = new TagController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Create
app.post("/api/user", (req, res) => {
    const controller = new UserController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

app.post("/api/user/login", (req, res) => {
    const controller = new UserController();
    controller.auth(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Get one
app.get("/api/user/:userId", (req, res) => {
    const controller = new UserController();
    controller.get(parseInt(req.params.userId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Get software
app.get("/api/user/:userId/software", (req, res) => {
    const controller = new UserController();
    controller.userSoftware(parseInt(req.params.userId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Get hardware
app.get("/api/user/:userId/hardware", (req, res) => {
    const controller = new UserController();
    controller.userHardware(parseInt(req.params.userId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Associate hardware to user account.
app.post("/api/:userId/hardware", (req, res) => {
   const controller = new UserController();
   controller.associateHardware(req.body, req.params.userId)
       .then((response: Response) => {
           res.send(response.toString());
       });
});

// User: Associate software to user account.
app.post("/api/:userId/software", (req, res) => {
    const controller = new UserController();
    controller.associateSoftware(req.body, req.params.userId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Delete (un-associate) hardware from user account.
app.post("/api/:userId/hardware/delete", (req, res) => {
    const controller = new UserController();
    controller.deleteHardware(req.body, req.params.userId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: Delete (un-associate) software from user account.
app.post("/api/:userId/software/delete", (req, res) => {
    const controller = new UserController();
    controller.deleteSoftware(req.body, req.params.userId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Media: Delete by ID.
app.delete("/api/media/:mediaId", (req, res) => {
    const controller = new MediaController();
    controller.delete(req.params.mediaId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// GETs one trade
app.get("/api/trade/:tradeId", (req, res) => {
    const controller = new TradeController();
    controller.get(parseInt(req.params.tradeId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// User: GETs many trades user is involved in
app.get("/api/user/:userId/trade", (req, res) => {
    const controller = new UserController();
    controller.userTrades(parseInt(req.params.userId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Creates new trade
app.post("/api/trade", (req, res) => {
    const controller = new TradeController();
    controller.post(req.body)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Accepts trade
app.post("/api/trade/:tradeId/accept", (req, res) => {
    const controller = new TradeController();
    controller.accept(parseInt(req.params.tradeId, 10))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Rejects (deletes) trade
app.delete("/api/trade/:tradeId", (req, res) => {
    const controller = new TradeController();
    controller.delete(parseInt(req.params.tradeId))
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Associates Media to Hardware
app.post("/api/hardware/:hardwareId/add-media", (req, res) => {
    const controller = new HardwareController();
    controller.associateMedia(req.body, req.params.hardwareId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

// Associates Media to Software
app.post("/api/software/:softwareId/add-media", (req, res) => {
    const controller = new SoftwareController();
    controller.associateMedia(req.body, req.params.softwareId)
        .then((response: Response) => {
            res.send(response.toString());
        });
});

app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../src/public/views/404.html'));
    });

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
} );