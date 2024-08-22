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

app.use("/", require("./routes/auth"))

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur en écoute sur http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});