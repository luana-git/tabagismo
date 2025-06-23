const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const apiRouter = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

app.use(middlewares);

// Servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API com /api
app.use("/api", apiRouter);

// Fallback para SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
