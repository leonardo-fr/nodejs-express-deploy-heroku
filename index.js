const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.send("Aplicação de compra de ingresso do cinema");
});

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:" + port);
});
