function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const clockElement = document.getElementById("zegar");
    if (clockElement) {
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
  
  updateClock(); // Pokaż od razu
  setInterval(updateClock, 1000); // Odświeżaj co 1 sekundę




  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const addNoteBtn = document.getElementById("add-note");
  const notesList = document.getElementById("notes-list");
  const displayNote = document.getElementById("display-note");
  
  const notes = [];
  
  addNoteBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
  
    if (title && content) {
      // Zapisz notatkę
      notes.push({ title, content });
  
      // Dodaj do listy po prawej
      const li = document.createElement("li");
      li.textContent = title;
  
      li.addEventListener("click", () => {
        displayNote.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
      });
  
      notesList.appendChild(li);
  
      // Wyczyść formularz
      titleInput.value = "";
      contentInput.value = "";
    } else {
      alert("Wpisz tytuł i treść notatki!");
    }
  });
  


document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pobranie danych z formularza rejestracji
    const username = document.getElementById("username-register").value;
    const password = document.getElementById("password-register").value;

    // Wysłanie zapytania do backendu
    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("message").textContent = data.message;
            document.getElementById("message").style.color = "green";
        } else {
            document.getElementById("message").textContent = data.message;
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Błąd serwera!";
        document.getElementById("message").style.color = "red";
    }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pobranie danych z formularza logowania
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;

    // Wysłanie zapytania do backendu
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("message").textContent = data.message;
            document.getElementById("message").style.color = "green";

            // Poczekaj 1 sekundę i przekieruj na main.html
            setTimeout(() => {
                window.location.href = "main.html";
                }, 1000);
        } 
        
        else {
            document.getElementById("message").textContent = data.message;
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Błąd serwera!";
        document.getElementById("message").style.color = "red";
    }
});


  
  