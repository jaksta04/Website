const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require('cors');

// Włącz CORS
app.use(cors());

// Używamy bodyParser do odczytu danych z formularza
app.use(bodyParser.json());


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

  res.status(200).json({ message: "Login successful!" });
});

app.get("/", (req, res) => {
    res.send("Backend działa! Teraz możesz logować się i rejestrować.");
});

// Uruchamiamy serwer
app.listen(5000, () => console.log("Backend running on port 5000"));


