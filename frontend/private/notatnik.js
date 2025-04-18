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