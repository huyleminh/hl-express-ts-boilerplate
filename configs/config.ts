import * as dotenv from "dotenv";

dotenv.config();

export class AppConfigs {
    static get AUTH_CLIENT_URL(): string {
        return process.env.AUTH_CLIENT_URL ? process.env.AUTH_CLIENT_URL : "*";
    }

    static get PORT(): number {
        return process.env.PORT ? +process.env.PORT : 5000;
    }

    static get APP_URL(): string {
        return process.env.APP_URL ? process.env.APP_URL : "http://localhost";
    }
}
