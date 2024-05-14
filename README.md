
# Asia Exchange Finder

## Description
Asia Exchange Finder est une application web qui aide les étudiants à trouver des opportunités d'échange en Asie. Elle fournit des informations détaillées sur les partenaires universitaires, les programmes disponibles, et permet une interaction facile entre les utilisateurs et les institutions.

## Fonctionnalités
- **Recherche de partenaires universitaires** : Recherchez et visualisez les partenaires universitaires en Asie.
- **Information détaillée** : Accédez à des informations détaillées sur les programmes d'échange.
- **Interaction utilisateur** : Fonctionnalités de connexion et d'inscription pour les utilisateurs.
- **Éditeur de contenu** : Outils d'édition pour mettre à jour les informations sur les partenaires et les programmes.

## Structure du projet
- **`src/assets`** : Contient les fichiers statiques comme les images et les styles.
- **`src/components`** : Composants Vue.js réutilisables.
    - **EditView** :
        - `ImagePageEditor.vue` : Éditeur pour les pages d'images.
        - `InformationPageEditor.vue` : Éditeur pour les pages d'informations.
        - `ListPartnerEditor.vue` : Éditeur pour la liste des partenaires.
        - `PartnerEditor.vue` : Éditeur pour les détails des partenaires.
        - `PartnerPageEditor.vue` : Éditeur pour les pages des partenaires.
    - **HomeComponent** :
        - `navbar.vue` : Barre de navigation pour l'accueil.
        - `PartnerCard.vue` : Carte de présentation des partenaires.
        - `UniversityCard.vue` : Carte de présentation des universités.
    - **Popup** :
        - `LoginPopup.vue` : Popup de connexion.
        - `SignupPopUp.vue` : Popup d'inscription.
- **`src/views`** : Pages Vue.js.
    - `AEF.vue` : Vue principale de l'application.
    - `Login.vue` : Vue pour la page de connexion.
    - `Signup.vue` : Vue pour la page d'inscription.
    - `Test.vue` : Vue pour les tests.
    - **About** :
        - `AboutUs.vue` : Vue pour la page "À propos de nous".
        - `Contact.vue` : Vue pour la page de contact.
        - `Privacy.vue` : Vue pour la page de politique de confidentialité.
        - `Terms.vue` : Vue pour la page des conditions d'utilisation.
    - **Asia-Exchange-Finder** :
        - `Edit.vue` : Vue pour l'édition des informations.
        - `EditorView.vue` : Vue pour l'interface de l'éditeur.
        - `Home.vue` : Vue pour la page d'accueil.
- **`src/router`** : Configuration des routes.
    - `index.js` : Fichier principal de configuration des routes.
- **`src/Mixins`** : Mixins pour Vue.js.
    - `firebase.js` : Mixin pour l'intégration de Firebase.
- **`public`** : Fichiers publics accessibles par l'application.
