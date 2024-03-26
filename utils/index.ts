export const removeUnnecessaryHeaders = (headers: Record<string, any>) => {
    delete headers['transfer-encoding'];
    delete headers['connection'];
    delete headers['x-powered-by']
    return headers;
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}