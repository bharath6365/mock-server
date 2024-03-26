import { ProxyDomains, Routes } from "@prisma/client";
import { getDbClient } from "../db/get-client";
import { MockConfigurationParams, MockRequest, MockServerResponse } from "../dto/mock";
import { getLogger } from "../utils/logger";
import { getProxyResponse } from "./proxy.service";
import { Request } from "express";
import { getMockOrOrigin } from './mock.service';
import { DEFAULT_PROXY_DOMAIN, NOT_FOUND_STRING, NUMERIC_REGEX } from "../constants";
const safeEval = require('safe-eval')
const {sql} = require('@prisma/client');

interface RouteConfiguration {
    scenarios: Array<string>,
    variables: Record<string, string>
}

const logger = getLogger();





export const getRoute = async(request: Request): Promise<MockServerResponse> => {
    const {originalUrl: path, method, headers, body, query} = request;
    logger.info(`Incoming request to getRoute for url ${path} and method ${method}`);
    const prisma = getDbClient();
    const proxyRequest: MockRequest = {
       method,
       path,
       query,
       body,
       headers,
    }
    const proxyParams: MockConfigurationParams = {
        request: proxyRequest,
        state: {
            scenarios: [],
            variables: {},
            proxyDomain: DEFAULT_PROXY_DOMAIN
        }
    }
    try {
        const query = sql`
          SELECT r.*, p.*
          FROM "Routes" r
          LEFT JOIN "ProxyDomains" p on r."proxy_domain_id" =  p."id"
          WHERE ${path} LIKE path AND r.method::text = ${method}
          ORDER BY LENGTH(path) DESC
          LIMIT 1`;
        const route = await prisma.$queryRaw<Array<Routes & ProxyDomains>>(query)
        if (route && route.length > 0) {
            const firstRoute = route[0];
            const configuration =  firstRoute.configuration as unknown as RouteConfiguration;
            deriveVariablesFromString(configuration.variables, request)
            const mockConfigurationParams =  {
                request: proxyRequest,
                state: {
                    scenarios: configuration.scenarios,
                    variables: configuration.variables,
                    attributes : {},
                    proxyDomain: firstRoute.domain
                }
            }

          return await getMockOrOrigin(mockConfigurationParams);
        } else {
            logger.info(`No route match for ${path}. Passing it to proxy`)
            return getResponseFromProxy(proxyParams)
        }
    } catch(err: any) {
        logger.error(`Error while calling mock from router for url: ${path},  Error: ${err.toString()}`);
        return await getResponseFromProxy(proxyParams);
    }
}

export const getResponseFromProxy = async (params: MockConfigurationParams) => {
    return await getProxyResponse(params);
}

// Evaluates expressions like  request.originalUrl.split('/')[5] into literals with the help of eval.
const deriveVariablesFromString = (variables: Record<string,string>, request: Request) => {
    const sandbox = {
        request: {
          originalUrl: request.originalUrl,
          body: request.body,
          headers: request.headers,
          query: request.query,
        },
    }

    for (const key in variables) {
        const expression = variables[key];
        try {
           if (NUMERIC_REGEX.test(expression)) {
             variables[key] = expression;
           } else {
            const value  = safeEval(expression, sandbox)
            variables[key] = value ? value.toString() : NOT_FOUND_STRING
           }
        } catch(error) {
           logger.error(`Exception while running safe eval on  ${expression} error is ${error}` )
           variables[key] = NOT_FOUND_STRING;
        }    
    }
}