// Structure pour stocker des entreprises et des matchs
let companies = [];
let matches = [];
// Variables pour stocker les catégories sélectionnées (si ces variables n'existent pas déjà dans votre code)
if (typeof resourceCategories === 'undefined') {
  var resourceCategories = [];
}
if (typeof needsCategories === 'undefined') {
  var needsCategories = [];
}

// Fonction pour initialiser des données de test si nécessaire
function initTestData() {
  console.log("Initialisation des données de test...");
  
  // Vérifier si des données existent déjà en localStorage
  const storedCompanies = localStorage.getItem('regenere_companies');
  const storedMatches = localStorage.getItem('regenere_matches');
  
  if (storedCompanies) {
    companies = JSON.parse(storedCompanies);
    console.log(`${companies.length} entreprises chargées depuis localStorage`);
  } else {
    // Créer quelques entreprises de test si aucune n'existe
    companies = [
      {
        id: 1,
        name: "EcoDesign SA",
        email: "contact@ecodesign.ch",
        address: "15 Rue du Rhône",
        postalCode: "1204",
        city: "Genève",
        website: "www.ecodesign.ch",
        resources: {
          categories: ["Déchets recyclables", "Expertise"],
          description: "30kg de carton recyclé par semaine, 5h de conseil en écoconception par mois",
          frequency: "régulière",
          mode: "présentiel",
          expertise: "expert"
        },
        needs: {
          categories: ["Espace", "Formation"],
          description: "Recherche espace de stockage temporaire (20m²), formation en marketing digital",
          frequency: "ponctuelle",
          mode: "mixte",
          expertise: "débutant"
        },
        notificationPreferences: "all"
      },
      {
        id: 2,
        name: "BureauFlex SARL",
        email: "info@bureauflex.ch",
        address: "25 Avenue de la Gare",
        postalCode: "1201",
        city: "Genève",
        website: "www.bureauflex.ch",
        resources: {
          categories: ["Espace", "Équipements & Outils"],
          description: "Salle de réunion disponible les mardis et jeudis, matériel informatique à partager",
          frequency: "régulière",
          mode: "présentiel",
          expertise: "intermédiaire"
        },
        needs: {
          categories: ["Expertise", "Déchets recyclables"],
          description: "Besoin de conseil juridique, recherche solution pour recyclage de mobilier",
          frequency: "ponctuelle",
          mode: "mixte",
          expertise: "expert"
        },
        notificationPreferences: "weekly"
      },
      {
        id: 3,
        name: "FormaPro Genève",
        email: "contact@formapro.ch",
        address: "8 Rue de Carouge",
        postalCode: "1205",
        city: "Genève",
        website: "www.formapro.ch",
        resources: {
          categories: ["Formation", "Compétences numériques"],
          description: "Offre 10h de formation en marketing digital par mois, développement d'outils numériques",
          frequency: "régulière",
          mode: "distanciel",
          expertise: "expert"
        },
        needs: {
          categories: ["Espace", "Matières premières"],
          description: "Recherche local pour ateliers (capacité 15 personnes), matériel de bureau",
          frequency: "régulière",
          mode: "présentiel",
          expertise: "intermédiaire"
        },
        notificationPreferences: "important"
      }
    ];
    localStorage.setItem('regenere_companies', JSON.stringify(companies));
    console.log("3 entreprises de test créées et enregistrées");
  }
  
  if (storedMatches) {
    matches = JSON.parse(storedMatches);
    console.log(`${matches.length} matchs chargés depuis localStorage`);
  } else {
    matches = [];
    localStorage.setItem('regenere_matches', JSON.stringify(matches));
    console.log("Aucun match existant, initialisation d'un tableau vide");
  }
}

// Fonction pour inspecter les données des entreprises (diagnostic)
function inspectCompanyData() {
  const companies = JSON.parse(localStorage.getItem('regenere_companies')) || [];
  
  console.log("===== INSPECTION DES DONNÉES =====");
  console.log(`Nombre d'entreprises: ${companies.length}`);
  
  companies.forEach((company, index) => {
    console.log(`\n--- Entreprise ${index + 1}: ${company.name} ---`);
    
    console.log("Ressources:");
    if (company.resources) {
      console.log("Categories:", company.resources.categories);
      if (Array.isArray(company.resources.categories)) {
        console.log("Nombre de catégories:", company.resources.categories.length);
      } else {
        console.log("ERREUR: categories n'est pas un tableau");
      }
    } else {
      console.log("ERREUR: Pas de propriété resources");
    }
    
    console.log("Besoins:");
    if (company.needs) {
      console.log("Categories:", company.needs.categories);
      if (Array.isArray(company.needs.categories)) {
        console.log("Nombre de catégories:", company.needs.categories.length);
      } else {
        console.log("ERREUR: categories n'est pas un tableau");
      }
    } else {
      console.log("ERREUR: Pas de propriété needs");
    }
  });
}

// Fonction pour trouver des matchs potentiels
function findMatches() {
  console.log("Recherche de matchs...");
  console.log("Nombre d'entreprises:", companies.length);
  
  let newMatches = [];
  
  // Pour chaque paire d'entreprises
  for (let i = 0; i < companies.length; i++) {
    for (let j = 0; j < companies.length; j++) {
      // Ne pas comparer une entreprise avec elle-même
      if (i !== j) {
        console.log(`Comparaison entre ${companies[i].name} et ${companies[j].name}`);
        
        // Vérifier les ressources de l'entreprise i avec les besoins de l'entreprise j
        const matchesFound = findMatchBetweenCompanies(companies[i], companies[j]);
        if (matchesFound.length > 0) {
          console.log(`${matchesFound.length} match(s) trouvé(s) entre ${companies[i].name} et ${companies[j].name}`);
          newMatches = [...newMatches, ...matchesFound];
        }
      }
    }
  }
  
  // Filtrer pour éliminer les doublons et les matchs déjà existants
  console.log("Nombre total de matchs trouvés:", newMatches.length);
  
  const uniqueNewMatches = newMatches.filter((match, index, self) => 
    index === self.findIndex(m => 
      m.provider.id === match.provider.id && 
      m.receiver.id === match.receiver.id &&
      m.resourceCategory === match.resourceCategory
    )
  );
  
  console.log("Matchs uniques:", uniqueNewMatches.length);
  
  // Filtrer pour ne garder que les matchs qui n'existent pas déjà
  const actuallyNewMatches = uniqueNewMatches.filter(newMatch => 
    !matches.some(existingMatch => 
      existingMatch.provider.id === newMatch.provider.id &&
      existingMatch.receiver.id === newMatch.receiver.id &&
      existingMatch.resourceCategory === newMatch.resourceCategory
    )
  );
  
  console.log("Nouveaux matchs:", actuallyNewMatches.length);
  
  // Ajouter la date aux nouveaux matchs
  actuallyNewMatches.forEach(match => {
    match.date = new Date().toISOString();
    match.id = Date.now() + Math.floor(Math.random() * 1000);
  });
  
  // Ajouter les nouveaux matchs à la liste existante
  matches = [...matches, ...actuallyNewMatches];
  
  // Sauvegarder dans localStorage
  localStorage.setItem('regenere_matches', JSON.stringify(matches));
  
  return actuallyNewMatches;
}

// Fonction pour trouver les matchs entre deux entreprises spécifiques
function findMatchBetweenCompanies(provider, receiver) {
  let foundMatches = [];
  
  // Vérifier que les catégories existent
  if (!provider.resources || !provider.resources.categories || !Array.isArray(provider.resources.categories) ||
      !receiver.needs || !receiver.needs.categories || !Array.isArray(receiver.needs.categories)) {
    console.log("Structure de données incorrecte pour la comparaison");
    return foundMatches;
  }
  
  console.log("Ressources offertes:", provider.resources.categories);
  console.log("Besoins recherchés:", receiver.needs.categories);
  
  // Pour chaque catégorie de ressources du fournisseur
  provider.resources.categories.forEach(resourceCategory => {
    // Vérifier si cette catégorie correspond à un besoin du receveur
    receiver.needs.categories.forEach(needCategory => {
      if (resourceCategory === needCategory) {
        console.log(`Match trouvé! ${provider.name} peut fournir "${resourceCategory}" à ${receiver.name}`);
        
        foundMatches.push({
          provider: {
            id: provider.id || Date.now(),
            name: provider.name
          },
          receiver: {
            id: receiver.id || Date.now() + 1,
            name: receiver.name
          },
          resourceCategory: resourceCategory,
          providerDescription: provider.resources.description || "",
          receiverDescription: receiver.needs.description || ""
        });
      }
    });
  });
  
  return foundMatches;
}

// Fonction pour récupérer les derniers matchs
function getLatestMatches(count = 3) {
  // Trier par date décroissante
  return [...matches].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB - dateA;
  }).slice(0, count);
}

// Fonction pour afficher les matchs sur la page
function displayMatches() {
  // Créer un conteneur pour les matchs s'il n'existe pas déjà
  let matchesSection = document.getElementById('matches-section');
  if (!matchesSection) {
    // Créer la section de matchs après la section "Comment ça marche"
    const howItWorksSection = document.getElementById('how-it-works');
    
    if (!howItWorksSection) {
      console.error("Section 'how-it-works' non trouvée");
      return;
    }
    
    matchesSection = document.createElement('section');
    matchesSection.id = 'matches-section';
    matchesSection.className = 'matches';
    matchesSection.style.backgroundColor = '#f7f9fc';
    matchesSection.style.padding = '50px 0';
    
    // Insérer après la section "how-it-works"
    howItWorksSection.parentNode.insertBefore(matchesSection, howItWorksSection.nextSibling);
  }
  
  // Récupérer les 3 derniers matchs
  const latestMatches = getLatestMatches(3);
  
  // Générer le HTML pour la section de matchs
  matchesSection.innerHTML = `
    <div class="container">
      <h2>Derniers Matchs Réalisés</h2>
      <p class="text-center" style="margin-bottom: 30px;">Découvrez les dernières synergies créées entre entreprises genevoises.</p>
      
      <div class="matches-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
        ${latestMatches.length > 0 ? latestMatches.map(match => `
          <div class="match-card" style="background-color: white; border-radius: 8px; padding: 25px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="background-color: #2A9D8F; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem;">Match</span>
              <span style="color: #6c757d; font-size: 0.9rem;">${match.date ? new Date(match.date).toLocaleDateString() : 'Date non spécifiée'}</span>
            </div>
            <h3 style="margin-top: 0; color: #264653; margin-bottom: 15px;">Catégorie: ${match.resourceCategory}</h3>
            <div style="margin-bottom: 15px;">
              <div style="font-weight: bold; color: #2A9D8F;">Fournisseur</div>
              <div>${match.provider.name}</div>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="font-weight: bold; color: #E76F51;">Receveur</div>
              <div>${match.receiver.name}</div>
            </div>
            <hr style="border: 0; height: 1px; background-color: #e0e0e0; margin: 15px 0;">
            <div style="font-size: 0.9rem; color: #333;">
              <div>Ressource: <span style="font-style: italic;">${match.providerDescription ? (match.providerDescription.substring(0, 100) + (match.providerDescription.length > 100 ? '...' : '')) : ''}</span></div>
              <div>Besoin: <span style="font-style: italic;">${match.receiverDescription ? (match.receiverDescription.substring(0, 100) + (match.receiverDescription.length > 100 ? '...' : '')) : ''}</span></div>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column: 1 / -1; text-align: center; padding: 30px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <p>Aucun match n'a encore été réalisé. Rejoignez notre écosystème pour créer les premières synergies !</p>
          </div>
        `}
      </div>
    </div>
  `;
  
  // Créer un bouton pour générer de nouveaux matchs (pour le test)
  const testButton = document.createElement('button');
  testButton.textContent = 'Tester: Trouver de nouveaux matchs';
  testButton.className = 'submit-btn';
  testButton.style.marginTop = '30px';
  testButton.style.width = '300px';
  testButton.onclick = function() {
    const newMatches = findMatches();
    if (newMatches.length > 0) {
      showMatchNotification(newMatches);
      displayMatches(); // Rafraîchir l'affichage
    } else {
      showNotification('Aucun nouveau match trouvé.', 'info');
    }
  };
  
  // Ajouter le bouton à la section
  const container = matchesSection.querySelector('.container');
  container.appendChild(testButton);
  
  // Ajouter un bouton pour inspecter les données
  const inspectButton = document.createElement('button');
  inspectButton.textContent = 'Diagnostiquer les données';
  inspectButton.className = 'submit-btn';
  inspectButton.style.marginTop = '15px';
  inspectButton.style.marginLeft = '10px';
  inspectButton.style.backgroundColor = '#264653';
  inspectButton.style.width = '300px';
  inspectButton.onclick = function() {
    inspectCompanyData();
    console.log("Diagnostic terminé. Vérifiez la console pour les détails (F12).");
    showNotification('Diagnostic terminé. Consultez la console (F12) pour voir les détails.', 'info');
  };
  container.appendChild(inspectButton);
}

// Fonction pour afficher une notification de nouveaux matchs
function showMatchNotification(newMatches) {
  // Création d'un élément modal pour la notification
  let modalOverlay = document.createElement('div');
  modalOverlay.style.position = 'fixed';
  modalOverlay.style.top = '0';
  modalOverlay.style.left = '0';
  modalOverlay.style.width = '100%';
  modalOverlay.style.height = '100%';
  modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modalOverlay.style.display = 'flex';
  modalOverlay.style.justifyContent = 'center';
  modalOverlay.style.alignItems = 'center';
  modalOverlay.style.zIndex = '1000';
  
  let modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '30px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.maxWidth = '600px';
  modalContent.style.width = '90%';
  modalContent.style.maxHeight = '80vh';
  modalContent.style.overflow = 'auto';
  
  // Titre et contenu
  modalContent.innerHTML = `
    <h2 style="color: #2A9D8F; margin-top: 0;">Nouveaux matchs trouvés! 🎉</h2>
    <p>Félicitations! Nous avons trouvé ${newMatches.length} nouveau${newMatches.length > 1 ? 'x' : ''} match${newMatches.length > 1 ? 's' : ''} entre entreprises:</p>
    
    <div style="margin-top: 20px;">
      ${newMatches.map(match => `
        <div style="border-left: 4px solid #2A9D8F; padding-left: 15px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #264653;">Catégorie: ${match.resourceCategory}</h3>
          <p><strong style="color: #2A9D8F;">${match.provider.name}</strong> peut fournir à <strong style="color: #E76F51;">${match.receiver.name}</strong></p>
        </div>
      `).join('')}
    </div>
    
    <button id="close-modal" style="background-color: #2A9D8F; color: white; border: none; padding: 12px 24px; font-size: 1rem; border-radius: 4px; cursor: pointer; margin-top: 20px; float: right;">Fermer</button>
  `;
  
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
  
  // Fermer le modal au clic sur le bouton
  document.getElementById('close-modal').addEventListener('click', function() {
    document.body.removeChild(modalOverlay);
  });
  
  // Fermer le modal au clic sur l'overlay
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });
}

// Fonction pour afficher une notification simple
function showNotification(message, type) {
  // Vérifier si la fonction existe déjà dans le code
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, type);
    return;
  }
  
  // Créer notre propre notification si la fonction n'existe pas
  let notification = document.getElementById('notification');
  
  // Créer l'élément de notification s'il n'existe pas
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '4px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1001';
    document.body.appendChild(notification);
  }
  
  // Définir le style selon le type
  if (type === 'success') {
    notification.style.backgroundColor = '#2A9D8F';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#E76F51';
  } else if (type === 'info') {
    notification.style.backgroundColor = '#E9C46A';
    notification.style.color = '#264653';
  }
  
  // Définir le message et afficher la notification
  notification.textContent = message;
  notification.style.display = 'block';
  
  // Masquer la notification après 5 secondes
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

// Fonction pour initialiser la fonctionnalité de match
function initMatchFunctionality() {
  console.log("Initialisation de la fonctionnalité de match...");
  
  // Initialiser les données de test
  initTestData();
  
  // Afficher les matchs existants
  displayMatches();
  
  // Mettre à jour la fonction d'enregistrement pour inclure la recherche de matchs
  const originalRegisterFunction = window.registerCompany;
  if (typeof originalRegisterFunction === 'function') {
    console.log("Fonction registerCompany trouvée, extension avec fonctionnalité de match");
    
    window.registerCompany = function() {
      console.log("Fonction registerCompany appelée");
      
      // Appeler la fonction d'origine
      originalRegisterFunction();
      
      // Récupérer les données du formulaire pour créer une nouvelle entreprise
      const companyName = document.getElementById('company-name')?.value;
      if (!companyName) {
        console.log("Nom d'entreprise non valide, arrêt de l'enregistrement");
        return; // Formulaire non valide
      }
      
      console.log("Création d'une nouvelle entreprise:", companyName);
      
      // Créer un nouvel objet entreprise
      const newCompany = {
        id: Date.now(),
        name: companyName,
        address: document.getElementById('company-address')?.value || "",
        postalCode: document.getElementById('company-postal')?.value || "",
        city: document.getElementById('company-city')?.value || "",
        website: document.getElementById('company-website')?.value || "",
        email: document.getElementById('company-email')?.value || "",
        resources: {
          categories: Array.isArray(resourceCategories) ? [...resourceCategories] : [], // Copier le tableau
          description: document.getElementById('resource-description')?.value || "",
          frequency: document.getElementById('resource-frequency')?.value || "",
          mode: document.getElementById('resource-mode')?.value || "",
          expertise: document.getElementById('resource-expertise')?.value || ""
        },
        needs: {
          categories: Array.isArray(needsCategories) ? [...needsCategories] : [], // Copier le tableau
          description: document.getElementById('needs-description')?.value || "",
          frequency: document.getElementById('needs-frequency')?.value || "",
          mode: document.getElementById('needs-mode')?.value || "",
          expertise: document.getElementById('needs-expertise')?.value || ""
        },
        notificationPreferences: document.getElementById('notification-pref')?.value || "all"
      };
      
      console.log("Nouvelle entreprise créée:", newCompany);
      
      // Ajouter la nouvelle entreprise à la liste
      companies.push(newCompany);
      localStorage.setItem('regenere_companies', JSON.stringify(companies));
      console.log("Entreprise ajoutée à localStorage");
      
      // Rechercher des matchs pour la nouvelle entreprise
      const newMatches = findMatches();
      console.log(`${newMatches.length} nouveaux matchs trouvés`);
      
      if (newMatches.length > 0) {
        // Afficher une notification avec les nouveaux matchs
        setTimeout(() => {
          showMatchNotification(newMatches);
          displayMatches(); // Mettre à jour l'affichage
        }, 1000);
      }
    };
  } else {
    console.warn("Fonction registerCompany non trouvée, impossible d'étendre avec la fonctionnalité de match");
  }
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initMatchFunctionality);

// Si le document est déjà chargé, initialiser immédiatement
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log("Document déjà chargé, initialisation immédiate");
  initMatchFunctionality();
}
