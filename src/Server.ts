import * as cors from "cors";
import * as express from "express";
import { AppConfigs } from "../configs/config";
import ControllerList from "./controllers";
import AppController from "./controllers/AppController";
import AppResponse from "./shared/AppResponse";

export default class Server {
    private _app: express.Application;
    private readonly PORT: number;

    constructor() {
        this._app = express();
        this.PORT = 5000;
    }

    initializeGlobalMiddlewares() {
        this._app.use(express.json()); // parsing application/json
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(
            cors({
                origin: AppConfigs.AUTH_CLIENT_URL,
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                allowedHeaders: [
                    "Origin",
                    "X-Requested-With",
                    "Content-Type",
                    "Accept",
                    "Authorization",
                ],
            })
        );
    }

    initializeControllers() {
        ControllerList.forEach((controller: AppController) => {
            this._app.use("/", controller.router);
        });
    }

    initializeErrorHandlerMiddlewares() {
        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            new AppResponse(res).sendNotFound();
        });

        this._app.use(
            (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                console.log(err);
                new AppResponse(res).sendInternalError();
            }
        );
    }

    start() {
        this.initializeGlobalMiddlewares();
        this.initializeControllers();
        this.initializeErrorHandlerMiddlewares();
        this._app.listen(this.PORT, () => {
            console.log(`Server is listening on http://localhost:${this.PORT}`);
        });
    }
}
