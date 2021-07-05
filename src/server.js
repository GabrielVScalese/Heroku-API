const express = require("express");
const routes = require("./routes");

require("dotenv").config();
require("./database"); // importar conexao, para permitir conexao do model com banco de dados

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
