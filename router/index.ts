import { Router, Express } from 'express';
import { healthController } from '../controllers/heath.controller';
import { getMockOrOriginController, routeController } from '../controllers/mock.controller';

export const initializeRoutes = (app: Express) => {
    // Add your routes here
    app.get("/api/health", healthController);
    app.post('/api/v1/mock', getMockOrOriginController);
    app.use('*', routeController);
    
}