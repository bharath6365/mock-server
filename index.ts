import { initializeAppMiddlewares } from './middlewares/index';
import { initializeRoutes } from './router/index';
import express, { Express, Request, Response } from 'express';
import { getLogger } from './utils/logger';

const app: Express = express();
const port = process.env.PORT || 8080;

const logger = getLogger();
initializeAppMiddlewares(app);
initializeRoutes(app)

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});