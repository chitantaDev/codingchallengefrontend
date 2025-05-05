document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('blur', function() {
        this.classList.add('touched');
    });
});

document.getElementById("nutzereingabe").addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll('input, select').forEach(input => {
        input.classList.add('touched');
    });

    const vorname = document.querySelector('.vorname').value.trim();
    const nachname = document.querySelector('.nachname').value.trim();
    const plz = document.querySelector('.plz').value.trim();
    const kmh = document.querySelector('.kmh').value.trim();
    const fahrzeug = document.querySelector('.fahrzeug').value;

    if (!vorname || !nachname || !plz || !kmh || !fahrzeug) {
        showError("Bitte füllen Sie alle Felder aus.");
        return; 
    }

    const formData = {
        firstname: vorname,
        lastname: nachname,
        plz: plz,
        kilometerleistung: kmh,
        fahrzeugtyp: fahrzeug
    };
    
    fetch('http://localhost:8080/premium/save/nutzereingabe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const praemie = data; 
        
        const ergebnisDiv = document.getElementById("ergebnis");
        ergebnisDiv.innerHTML = `
            <h3>Versicherungsprämie für: ${vorname} ${nachname}</h3>
            <p><strong>Prämie:</strong> ${praemie}€</p>
            <p><strong>Fahrzeugtyp:</strong> ${fahrzeug}</p>
            <p><strong>Kilometerleistung:</strong> ${kmh}</p>
            <p><strong>PLZ:</strong> ${plz}</p>
        `;

        ergebnisDiv.style.display = "block";  

        clearError();
    })
    .catch(error => {
        console.error('Error:', error);
        showError("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
    });
});

function showError(message) {
    let errorDiv = document.getElementById("error-message");
    
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.style.color = "#d9534f";
        errorDiv.style.marginTop = "10px";
        errorDiv.style.padding = "10px";
        errorDiv.style.backgroundColor = "#f8d7da";
        errorDiv.style.borderRadius = "4px";
        errorDiv.style.textAlign = "center";
        
        const form = document.getElementById("nutzereingabe");
        form.parentNode.insertBefore(errorDiv, form);
    }
    
    errorDiv.textContent = message;
}

function clearError() {
    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.remove();
    }
}