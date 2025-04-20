
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

setInterval(checkSession, 120000);  




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


document.getElementById("Notatnik").addEventListener("click", () => {
    window.location.href = "/Notatnik";
  });
  

  document.getElementById("Tlumacz").addEventListener("click", () => {
    window.location.href = "/Tlumacz";
  });

