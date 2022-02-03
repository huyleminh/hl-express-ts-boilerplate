import { Request, Response } from "express";
import AppResponse from "../../shared/AppResponse";
import AppController from "../AppController";

export default class DemoController extends AppController {
    constructor() {
        super();
    }

    init(): void {
        this._router.get("/", this.handleDemo);
    }

    handleDemo(req: Request, res: Response): void {
        new AppResponse(res).message("Hello").send();
    }
}
