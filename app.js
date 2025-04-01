document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - app.js est exécuté");
    
    // Bouton de connexion
    document.getElementById('login-button').addEventListener('click', function() {
        openLoginModal();
    });
    
    // Bouton d'inscription
    document.getElementById('register-button').addEventListener('click', function() {
        scrollToRegistration();
    });
});
