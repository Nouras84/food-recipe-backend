// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require("dotenv").config();

// // ℹ️ Connects to the database

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require("express");

// const app = express();

// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require("./config")(app);

// // 👇 Start handling routes here
// const indexRoutes = require("./routes/index.routes");
// app.use("/api", indexRoutes);

// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require("./error-handling")(app);

// module.exports = app;
require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");
const categoryRoutes = require("./routes/category.routes");

app.use(express.json()); // Middleware for parsing JSON bodies

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);

// ... rest of your Express app setup ...

module.exports = app;

// ... rest of your Express app setup ...
