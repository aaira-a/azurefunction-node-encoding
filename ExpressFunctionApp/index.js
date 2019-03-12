const createHandler = require("azure-function-express");
const app = require("./app");

// Binds the express app to an Azure Function handler
module.exports = createHandler(app);
