document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - app.js est exécuté");
    
    // Tester si on peut trouver la modal de connexion directement
    var loginModal = document.getElementById('loginModal');
    console.log("Modal de connexion:", loginModal); // Ceci devrait afficher l'élément ou null
    
    // Vérifier tous les éléments avec ID pour débogage
    var allElementsWithId = document.querySelectorAll('[id]');
    console.log("Tous les éléments avec ID:", allElementsWithId);
    
    // Attacher l'événement au bouton de connexion
    var loginButton = document.getElementById('login-button');
    if (loginButton) {
        console.log("Bouton connexion trouvé");
        loginButton.addEventListener('click', function() {
            console.log("Clic sur connexion");
            // Afficher manuellement la modal
            var modal = document.getElementById('loginModal');
            if (modal) {
                console.log("Modal trouvée, tentative d'affichage");
                modal.style.display = 'flex';
                console.log("Style display modifié à 'flex'");
            } else {
                console.log("ERREUR: Modal introuvable");
            }
        });
    } else {
        console.log("ERREUR: Bouton connexion introuvable");
    }
    
    // Code pour le bouton d'inscription reste inchangé
    // ...
});
