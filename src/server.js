const express = require("express");
const routes = require("./routes");

require("./database"); // importat conexao, para permitir conexao do model com banco de dados

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(5000);
