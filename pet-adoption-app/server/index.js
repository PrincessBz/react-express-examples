const express = require("express");
const path = require("path");
const app = express();

const pets = [
  { name: "Local", type: "Dog", age: 3 },
  { name: "React", type: "Cat", age: 2 },
  { name: "Server", type: "Turtle", age: 1 },
];

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/pets", (request, response) => {
  return response.json(pets);
});

app.post("/api/pets", (request, response) => {});

app.get("*", (request, response) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
