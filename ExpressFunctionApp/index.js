const AzureFunctionHandler = require("azure-function-express").createHandler;
const app = require("./app");

// Binds the express app to an Azure Function handler
module.exports = AzureFunctionHandler(app);
