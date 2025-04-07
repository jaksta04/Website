const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require('cors');

const path = require("path");



const jwt = require("jsonwebtoken");
const SECRET_KEY = "tajny_klucz"; // w realnym projekcie trzymaj to w .env



app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],  // Pozwól na zapytania tylko z tych origin
  credentials: true,  // Umożliwia wysyłanie ciasteczek (cookies) i tokenów
  allowedHeaders: ['Content-Type', 'Authorization'],  // Zezwala na nagłówki typu Authorization
  methods: ['GET', 'POST', 'PUT', 'DELETE']  // Określa dozwolone metody
}));

app.use(express.json()); 




// Funkcja do wczytania użytkowników z pliku JSON
function loadUsers() {
  const data = fs.readFileSync("users.json", "utf8");
  return JSON.parse(data);
}

// Rejestracja użytkownika
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  // Sprawdzamy, czy użytkownik już istnieje
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hasło musi być zaszyfrowane
  const hashedPassword = await bcrypt.hash(password, 10);

  // Dodajemy nowego użytkownika
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  // Zapisujemy użytkowników do pliku JSON
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully!" });
});

// Logowanie użytkownika
app.post("/login", async (req, res) => {

  const { username, password } = req.body;
  const users = loadUsers();

  // Sprawdzamy, czy użytkownik istnieje
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Sprawdzamy, czy hasło jest poprawne
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Tworzenie tokena JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30s" });

  console.log("Token wygenerowany:", token); // Logowanie tokena, aby upewnić się, że jest generowany


  res.status(200).json({ message: "Login successful!", token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // brak tokena

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // token nieprawidłowy
    req.user = user;
    next();
  });
}

app.get("/api/verify-auth", authenticateToken, (req, res) => {
  res.json({ 
    status: "authenticated",
    user: req.user.username 
  });
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "main.html"));
});


// Uruchamiamy serwer
app.listen(5000, () => console.log("Backend running on port 5000"));


