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
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("message").textContent = data.message;
            document.getElementById("message").style.color = "green";

            document.getElementById("username-login").value = ""; // Wyczyść pole
            document.getElementById("password-login").value = ""; 

            document.getElementById("Go-to-register").style.display = "none"; // Ukryj formularz logowania


            // Poczekaj 1 sekundę i przekieruj na main.html
            setTimeout(() => {
                window.location.href = "/main";
            
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

document.getElementById("Go-to-register").addEventListener("click", () => {
    window.location.href = "/register";
});


  
  