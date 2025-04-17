
function checkSession() {
  fetch('/verify', {
    method: 'GET',
    credentials: 'include',  // Używamy ciasteczek
  })
  .then(response => {
    if (!response.ok) { 
      window.location.href = '/';  // Przekierowanie na stronę logowania
    }
  })
  .catch(error => {
    console.error('Error checking session:', error);
    window.location.href = '/';  // Jeśli wystąpi błąd, przekierowanie na stronę logowania
  });
}
// Wywołaj checkSession co 30 sekund
setInterval(checkSession, 3000);  // Sprawdzanie sesji co 30 sekund







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
  

