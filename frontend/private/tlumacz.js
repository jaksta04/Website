let timeout = null;

document.getElementById("TextIn").addEventListener("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const text = document.getElementById("TextIn").value.trim();

        if(!text)
            {
                document.getElementById("TextOut").value = "";
                return;
            }
        

        fetch('/tlumaczenie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("TextOut").value = data.translated;
            })
            .catch(() => {
                document.getElementById("TextOut").value = "Błąd tłumaczenia";
            });
    },300);

});