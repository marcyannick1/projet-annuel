const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("express");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

app.use("/", require("./src/routes/auth"))
app.use("/user", require("./src/routes/user"))
app.use("/file", require("./src/routes/file"))
app.use("/subscription", require("./src/routes/subscription"))
app.use("/email", require("./src/routes/email"))
app.use("/stats", require("./src/routes/stats"))

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur en écoute sur http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});