const fs = require("fs");
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
require('dotenv').config({path: "../.env"});


const app = express();
app.use(cookieParser());

const cors = require('cors');
const { error } = require("console");
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));




app.use(express.json()); 
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.static(path.join(__dirname, '..', 'frontend','private')));





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

  res.status(201).json({ message: "Użytkownik zarejestrowany" });
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
  const AccessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

  
  console.log("Token wygenerowany:", AccessToken); 

 
  return res.cookie("Access_Token", AccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax', // Dodaj to
    })
    .status(200)
    .json({ message: "Zalogowano pomyślnie" });
});


const authorization = (req, res, next) => {
  const token = req.cookies.Access_Token;
  if (!token) {
    console.log('Brak tokena - przekierowanie do loginu');
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Nieprawidłowy token:', err.message);
      res.clearCookie('Access_Token');
      return res.status(403).send("Forbidden");
    }
    
    req.username = decoded.username;
    next(); // Przekazujemy kontrolę bez wysyłania odpowiedzi
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend','index.html'));
});




app.get('/verify', authorization, (req, res) => {
  console.log('Session is active');
  res.status(200).json({ message: 'Session is active' });
});




app.get("/main", authorization, (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend','private','main.html'));

});

app.get("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});




// Uruchamiamy serwer
app.listen(5000, () => console.log("Backend running on port 5000"));


