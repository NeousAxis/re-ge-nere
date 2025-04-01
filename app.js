function seDeconnecter() {
    logoutUser();
}

// Fonction de déconnexion
function logoutUser() {
    document.getElementById('auth-status').innerHTML = `
        <div style="display: flex; gap: 10px;">
            <button id="login-button" class="submit-btn" style="background-color: #264653;">Connexion</button>
            <button id="register-button" class="submit-btn" onclick="scrollToRegistration()">Inscription</button>
        </div>
    `;
    showNotification('Vous avez été déconnecté.', 'success');
}
