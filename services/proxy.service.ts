import { MockConfigurationParams } from '../dto/mock';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { getLogger } from '../utils/logger';
const logger = getLogger();

export const getProxyResponse = async (params: MockConfigurationParams) => {
    try {
      const proxyResponse = await proxy(params); 
       const {data, status, headers} = proxyResponse as any;
       return {
         body: data,
         statusCode: status,
         headers
       }
    } catch(error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const {data, status, headers} = error.response;
        return {
          body: data,
          statusCode: status,
          headers
        }
      }
  
      logger.error(`Unhandled exception in proxy, ${JSON.stringify(error)}`)
  
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: `Unhandled exception in Mountebank proxy, ${error}}`
      }
    }
     
  }
  

const proxy = async (params: MockConfigurationParams): Promise<AxiosResponse | null> => {
    const {request, state} = params || {};
    const {path, method, body } = request || {};
    logger.info(`Request received on proxy for domain ${state.proxyDomain}, path ${path}, method: ${method}`);
    const incomingHeaders = request.headers as any;
    const url = `${state.proxyDomain}${path}`
    // Change the host to avoid CORS issues
    const host = new URL(url).host;
    const headers = {
    ...incomingHeaders,
    Host: host
    }   
    switch (method) {
    case 'GET':
        return  await axios.get(url, {headers});

    case 'POST':
        return await axios.post(url, body, {headers});

    case 'PUT':
        return  await axios.put(url, body, {headers});

    case 'DELETE':
        return await axios.delete(url, {headers});

    case 'PATCH':
        return await axios.patch(url, body, {headers});

    case  'OPTIONS':
        return await axios.options(url, {headers});

    default:
        return null;
      }

}

