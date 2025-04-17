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

            document.getElementById("username-register").value = ""; // Wyczyść pole
            document.getElementById("password-register").value = ""; // Wyczyść pole
            document.getElementById("submit").style.display = "none"; // Ukryj formularz rejestracji
            document.getElementById("Go-to-login").style.display = "none"; // Ukryj formularz rejestracji
            document.getElementById("GoTo").style.display = "block"; // Pokaż przycisk przekierowujący do logowania
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

document.getElementById("GoTo").addEventListener("click", () => {
    window.location.href = "index.html"; // Przekierowanie do strony logowania
});