## Mock Server

* **What is it?**

A mock server is a tool that can simulate the behavior of a real server. It can be used to test and develop applications without having to rely on a real server.

* **Features:**

This mock server supports the following features:

    * Routing: The mock server can be configured to handle different routes, each with its own response.
    * Proxying: The mock server can be configured to proxy requests to other servers.
    * Scenarios: The mock server can be configured to simulate different scenarios, such as errors and delays.

* **Usage:**

To use the mock server, you will need to:

1. Install it.
2. Configure it to handle the requests that you want it to simulate.
3. Start it.
4. Send requests to it using your favorite HTTP client.

* **Configuration:**

The mock server can be configured using a JSON configuration file. The configuration file specifies the routes that the mock server should handle, the proxy domains that the mock server should proxy requests to, and the scenarios that the mock server can simulate.

* **Routes:**

A route is a configuration for a specific request path and method. Routes can be configured to return a mock response, proxy the request to another server, or redirect the request to a different path.

Each route configuration must include the following properties:

    * path: The path of the request that the route matches.
    * method: The method of the request that the route matches.
    * configuration: The configuration for the route.

The configuration property can contain the following properties:

    * scenarios: A list of scenarios that the route can use.
    * variables: A list of variables that the route can use.

* **Scenarios:**

A scenario is a configuration for a specific behavior that the mock server can simulate. Scenarios can be used to simulate errors, delays, and other behaviors.

Each scenario configuration must include the following properties:

    * name: The name of the scenario.
    * mock: The mock response that the scenario returns.

* **Mock Responses:**

A mock response is a configuration for a response that the mock server can return. Mock responses can be configured to return a specific status code, body, and headers.

Each mock response configuration must include the following properties:

    * body: The body of the response.
    * headers: The headers of the response.

* **Variables:**

Variables can be used to fetch data from the request. For example, the following variable would fetch the `applicationId` variable from the request URL:

Use code with caution. Learn more
request.originalUrl.split('/')[7]

This variable could be used in a mock response to return a specific response for the specific application ID.

Example:
The following example shows how to configure a mock server to handle a request to the /api/v1/applications/:applicationId/risk-evaluation endpoint:

json
{
"routes": [
{
"path": "/api/v1/applications/:applicationId/risk-evaluation",
"method": "GET",
"configuration": {
"scenarios": ["RISK3_EVALUATION_SUCCESS"],
"variables": {
"applicationId": "request.originalUrl.split('/')[7]"
}
}
}
],
"scenarios": [
{
"name": "RISK3_EVALUATION_SUCCESS",
"mock": {
"body": {
"status": "success"
}
}
}
]
}

This configuration will cause the mock server to return a success response when a request is made to the /api/v1/applications/:applicationId/risk-evaluation endpoint. The applicationId variable will be used to fetch the application ID from the request URL.

Express:
The mock server uses the Express framework to handle requests.

This mock server uses Prisma as the ORM and PostgreSQL as the database.

**Prisma** is a powerful ORM that drastically simplifies data modeling, migrations, and data access for SQL databases in Node.js and TypeScript. It provides a declarative schema language, a powerful query builder, and a type-safe client library.

**Prisma Client** is a generated library that provides a type-safe and performant way to interact with your database. It is generated from your Prisma schema, and it includes all of the necessary code to perform CRUD operations, as well as more complex queries.

**Need for Prisma Client:**

Prisma Client provides a number of benefits over using traditional ORMs or SQL queries directly. These benefits include:

* **Type safety:** Prisma Client is type-safe, which means that you can be confident that your code is correct and that you are not making any mistakes.
* **Performance:** Prisma Client is highly performant, and it can handle even the most complex queries with ease.
* **Simplicity:** Prisma Client is easy to use, and it provides a simple and intuitive way to interact with your database.

**Building the project locally and shipping it to Docker:**
npm run build
