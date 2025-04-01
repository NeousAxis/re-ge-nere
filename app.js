document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ouvrir la modal de connexion
    function ouvrirModalConnexion() {
        const modalConnexion = document.getElementById('loginModal');
        if (modalConnexion) {
            modalConnexion.style.display = 'flex';
        }
    }

    // Fonction pour fermer la modal de connexion
    function fermerModalConnexion() {
        const modalConnexion = document.getElementById('loginModal');
        if (modalConnexion) {
            modalConnexion.style.display = 'none';
        }
    }

    // Fonction pour faire défiler jusqu'au formulaire d'inscription
    function defilerVersInscription() {
        const sectionInscription = document.getElementById('registration');
        if (sectionInscription) {
            sectionInscription.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Fonction de connexion
    function seConnecter() {
        const emailInput = document.getElementById('login-email');
        const email = emailInput ? emailInput.value.trim() : '';
        
        if (!email) {
            afficherNotification('Veuillez saisir votre email', 'erreur');
            return;
        }

        // Vérifier les entreprises enregistrées
        const entreprises = JSON.parse(localStorage.getItem('regenere_companies') || '[]');
        const entrepriseCorrespondante = entreprises.find(entreprise => entreprise.email === email);

        if (entrepriseCorrespondante) {
            // Connexion réussie
            afficherNotification(`Bienvenue, ${entrepriseCorrespondante.name}!`, 'succès');
            fermerModalConnexion();
            
            // Mettre à jour l'interface pour montrer que l'utilisateur est connecté
            document.getElementById('auth-status').innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; flex-direction: column; align-items: flex-end; margin-right: 10px;">
            <div style="color: white; font-size: 0.9rem;">Connecté en tant que :</div>
            <div style="color: white; font-weight: bold;">${entrepriseCorrespondante.name}</div>
        </div>
        <button class="submit-btn" style="background-color: #264653; margin: 0;" onclick="seDeconnecter()">Déconnexion</button>
    </div>
`;

    // Fonction de déconnexion
    function seDeconnecter() {
        const zoneAuthentification = document.getElementById('auth-status');
        if (zoneAuthentification) {
            zoneAuthentification.innerHTML = `
                <div style="display: flex; gap: 10px;">
                    <button id="login-button" class="submit-btn" style="background-color: #264653;">Connexion</button>
                    <button id="register-button" class="submit-btn">Inscription</button>
                </div>
            `;
            
            // Réattacher les écouteurs d'événements
            document.getElementById('login-button').addEventListener('click', ouvrirModalConnexion);
            document.getElementById('register-button').addEventListener('click', defilerVersInscription);
            
            afficherNotification('Vous avez été déconnecté', 'succès');
        }
    }

    // Fonction pour afficher des notifications
    function afficherNotification(message, type) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = type === 'succès' ? 'success' : 'error';
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    // Attacher les événements initiaux
    const boutonConnexion = document.getElementById('login-button');
    const boutonInscription = document.getElementById('register-button');

    if (boutonConnexion) {
        boutonConnexion.addEventListener('click', ouvrirModalConnexion);
    }

    if (boutonInscription) {
        boutonInscription.addEventListener('click', defilerVersInscription);
    }

    // Remplacer les fonctions globales existantes
    window.openLoginModal = ouvrirModalConnexion;
    window.closeLoginModal = fermerModalConnexion;
    window.scrollToRegistration = defilerVersInscription;
    window.loginUser = seConnecter;
    window.logoutUser = seDeconnecter;
});
