const config = require("./config");
const hbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "static")));
console.log(path.join(__dirname, "views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/ang/", (req, res) => {
  res.render("mainpage", {
    title: "Zadanka angielski",
  });
});

app.get("/ang/krzyzowka", (req, res) => {
  res.render("crossword", {
    title: "Krzyżówka",
  });
});

app.get("/ang/polacz-elementy", (req, res) => {
  res.render("connect", {
    title: "Połącz elementy",
  });
});

app.get("/ang/wstaw-wyrazy", (req, res) => {
  res.render("insert_word", {
    title: "Wstaw wyraz",
  });
});

app.get("/ang/projekt-uk", (req, res) => {
  res.render("project-uk", {
    title: "Projekt UK",
  });
});

app.listen(config.port, () => {
  console.log(`Server is working on port ${config.port}. 
    See http://localhost:${config.port}`);
});
