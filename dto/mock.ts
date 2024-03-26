import { Prisma } from '@prisma/client';

export interface MockRequest {
  method: string;
  path: string;
  query: any;
  body: any;
  headers: Record<string, any>;
}

export interface MockConfigurationParams {
    request: MockRequest;
    state: {
        scenarios: Array<string>;
        variables: Record<string, string>;
        attributes? : Record<string, string>;
        proxyDomain: string;
    }
} 

export interface MockServerResponse  {
    body: Prisma.JsonValue;
    statusCode: number;
    headers: Prisma.JsonValue;
}