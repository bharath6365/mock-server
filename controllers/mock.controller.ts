
import {Request, Response} from 'express';
import { MockConfigurationParams } from '../dto/mock';
import { getMockOrOrigin } from '../services/mock.service';
import { removeUnnecessaryHeaders } from '../utils';
import { getLogger } from '../utils/logger';
import { getRoute } from '../services/route.service';
const logger = getLogger();

export const getMockOrOriginController = async(req: Request, res: Response) => {
    const params: MockConfigurationParams = req.body;
    logger.info(`Request received on mock controller for ${params?.request?.path}`);
    const mockOrOriginResponse =  await getMockOrOrigin(params);
    const headers = mockOrOriginResponse.headers as any;
    removeUnnecessaryHeaders(headers);
    res.set(headers);
    res.status(mockOrOriginResponse.statusCode).send(mockOrOriginResponse.body);

}

export const routeController = async(req: Request, res: Response) => {
    logger.info(`Request received on route controller for ${req.originalUrl}`);
    const response  = await getRoute(req)

    const headers = response.headers as Record<string, any>;
    for (const key in headers) {
        res.setHeader(key, headers[key]);
      }
    res.status(response.statusCode).send(response.body);
}