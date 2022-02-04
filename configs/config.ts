import * as dotenv from "dotenv";

dotenv.config();

export class AppConfigs {
    static get AUTH_CLIENT_URL() {
        return process.env.AUTH_CLIENT_URL;
    }

    static get PORT() {
        return process.env.PORT ? +process.env.PORT : 5000;
    }
}
