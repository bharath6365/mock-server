import { getLogger } from './../utils/logger';
import {  Prisma } from '@prisma/client';
import { getDbClient } from '../db/get-client';
import { MockConfigurationParams, MockServerResponse } from '../dto/mock';
import { getProxyResponse } from './proxy.service';
import { log } from 'console';

const logger = getLogger();

export const getMockOrOrigin = async (params: MockConfigurationParams): Promise<MockServerResponse> => {
    const {request, state} = params;
    const {path, method, headers, body} = request;
    logger.info(`Request received on mock service for ${path}, method: ${method}`);
    const {scenarios, variables} = state;
    const prisma = getDbClient();
    const variablesArray = getVariablesArray(variables);
    logger.info(`Scenarios ${scenarios} variables ${JSON.stringify(variables)}, variablesArray ${JSON.stringify(variablesArray)}`)
    try {
      const response = await prisma.scenarios.findFirst({
        where: {
          AND: [
            {
              name: {
                in: scenarios
              }
            },
            ...variablesArray
          ]
        },
        include: {
          mock: {},
        },
      })

      if (response?.mock) {
        logger.info(`Mock found for url: ${path} method: ${method}`);
        const {body, headers} = response.mock;
        const {statusCode} = headers as {statusCode: number};
        const transformedBody = transformMockResponse(body, variables);
        return {
            body: transformedBody,
            headers,
            statusCode
        }
      } else {
        logger.info(`Mock not found for url: ${path} method: ${method}. Getting response from proxy`);
        return await getProxyResponse(params);
      }
    } catch(err) {
      logger.error(`Error while getting mock for url: ${path} method: ${method} headers: ${headers} body: ${body}. Error: ${err}`);
      return await getProxyResponse(params);
    }
}

// Replace {{variable}} wildcard defined in the mock with value passed in the  variables object.
const transformMockResponse  = (mock: Prisma.JsonValue, variables: Record<string, string>) => {
  let transformedMock = '';
  Object.keys(variables).forEach(key => {
      if (transformedMock.length > 0) {
        transformedMock = transformedMock.replace(`{{${key}}}`, variables[key]);
      } else {
        transformedMock = JSON.stringify(mock).replace(`{{${key}}}`, variables[key]);
      }
      
  })

  return JSON.parse(transformedMock);
}
interface VariableQuery {
  variables: {
    path: string;
    equals: string;
  }
}

// Returns an array of objects with path as key defined in variable and equals as value 
const getVariablesArray = (variables: Record<string, string>): Array<VariableQuery> => {
  return Object.keys(variables).map(key => {
    return {
      variables: {
        path: key,
        equals: variables[key]
      }
    }
  })
}