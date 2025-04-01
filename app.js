// Fichier app.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - app.js est exécuté");
    
    // Attacher les événements aux boutons
    var loginButton = document.getElementById('login-button');
    var registerButton = document.getElementById('register-button');
    
    if (loginButton) {
        console.log("Bouton connexion trouvé");
        loginButton.addEventListener('click', function() {
            console.log("Clic sur connexion");
            // Afficher manuellement la modal
            var modal = document.getElementById('loginModal');
            if (modal) {
                modal.style.display = 'flex';
                console.log("Modal affichée");
            } else {
                console.log("Modal introuvable");
            }
        });
    } else {
        console.log("Bouton connexion introuvable");
    }
    
    if (registerButton) {
        console.log("Bouton inscription trouvé");
        registerButton.addEventListener('click', function() {
            console.log("Clic sur inscription");
            var registrationSection = document.getElementById('registration');
            if (registrationSection) {
                registrationSection.scrollIntoView({behavior: 'smooth'});
                console.log("Défilement vers inscription");
            } else {
                console.log("Section d'inscription introuvable");
            }
        });
    } else {
        console.log("Bouton inscription introuvable");
    }
});
