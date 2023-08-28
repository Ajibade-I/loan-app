const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { dbconnect } = require("./lib/dbconnect");
const { account_routes, user_routes } = require("./routes");
const port = process.env.PORT || 4000;

dbconnect();

app.use(express.json());
app.use("/api/users", user_routes);
app.use("/api/accounts", account_routes);

app.listen(port, () => console.log(`server listening on port ${port}...`));
