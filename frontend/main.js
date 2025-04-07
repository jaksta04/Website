async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/verify-auth", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Unauthorized");
        }
        const data = await response.json();

        console.log("Użytkownik zweryfikowany:", data.user); // "przyklad"
    } catch (err) {
        window.location.href = "index.html";
    }
}

checkAuth();




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
  

