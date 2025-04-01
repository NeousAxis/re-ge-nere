document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - app.js est exécuté");
    
    // Vérifier si la modal existe
    var loginModal = document.getElementById('loginModal');
    console.log("Modal trouvée:", loginModal);
    
    // Attacher l'événement directement à l'élément
    var loginButton = document.getElementById('login-button');
    if (loginButton) {
        console.log("Bouton connexion trouvé");
        
        loginButton.addEventListener('click', function() {
            console.log("Clic sur connexion détecté");
            
            // Approche directe pour afficher la modal
            var modal = document.getElementById('loginModal');
            if (modal) {
                console.log("Tentative d'affichage de la modal");
                modal.style.display = 'flex';
                console.log("Style display changé à 'flex'");
            } else {
                console.log("ERREUR: Modal introuvable lors du clic");
            }
        });
    } else {
        console.log("ERREUR: Bouton connexion introuvable");
    }
    
    // Gérer la fermeture de la modal
    var closeButton = document.querySelector('#loginModal button:first-of-type');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }
    
    // Fermer si clic en dehors
    if (loginModal) {
        loginModal.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
    
    // Conserver la fonctionnalité d'inscription
    var registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            var section = document.getElementById('registration');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
