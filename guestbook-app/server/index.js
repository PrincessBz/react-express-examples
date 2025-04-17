const express = require("express");
const path = require("path");
const app = express();

const messages = [
  { name: "Alice", text: "Hello, world!" },
  { name: "Bob", text: "Express is cool." },
];

// Middleware to parse JSON bodies
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static React files
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/messages", (request, response) => {
  return response.json(messages);
});

app.post("/api/messages", (request, response) => {
  const incomingMessage = request.body;

  if (!incomingMessage?.name || !incomingMessage?.text) {
    return response.status(400).json({ error: "Name and text are required." });
  }

  messages.push({
    name: incomingMessage.name,
    text: incomingMessage.text,
  });
  return response.status(201).json(messages[messages.length - 1]);
});

// Serve the React app
app.get("/admin", (request, response) => {
  return response.render("admin", { messages: messages });
});

// Fallback for React Router
app.get("*", (request, response) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
