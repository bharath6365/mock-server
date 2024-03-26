import bodyParser from "body-parser";
import { Express } from 'express';
export const initializeAppMiddlewares = (app: Express) => {
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: true }));
}