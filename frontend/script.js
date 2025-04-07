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

            localStorage.setItem("token", data.token); // zapisz token

            console.log("Zapisany token:", localStorage.getItem("token")); // Logowanie zapisania tokena


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


  
  