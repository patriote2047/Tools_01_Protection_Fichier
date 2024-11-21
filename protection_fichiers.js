const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const PREFIX_BLOCAGE = 'BLOQUER_';
const HEADER_PROTECTION = `/*
!!! FICHIER BLOQUÉ !!!
Ce fichier est protégé contre les modifications.
Pour modifier ce fichier :
1. Utilisez l'utilitaire de protection des fichiers
2. Choisissez l'option de déblocage
3. Effectuez vos modifications
4. Bloquez à nouveau le fichier
*/

`;

// Interface de ligne de commande interactive
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction principale
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length >= 2) {
        // Mode ligne de commande
        const commande = args[0].toLowerCase();
        const fichier = args[1];
        
        if (commande === 'bloquer' || commande === 'b') {
            await bloquerFichier(fichier);
        } else if (commande === 'debloquer' || commande === 'd') {
            await debloquerFichier(fichier);
        } else {
            console.log('❌ Commande invalide. Utilisez "bloquer" ou "debloquer"');
        }
        rl.close();
    } else {
        // Mode interactif
        afficherMenu();
    }
}

// Affiche le menu interactif
function afficherMenu() {
    console.log('\n=== Utilitaire de Protection des Fichiers ===');
    console.log('1. Bloquer un fichier');
    console.log('2. Débloquer un fichier');
    console.log('3. Quitter');
    console.log('==========================================\n');
    
    rl.question('Choisissez une option (1-3) : ', async (choix) => {
        switch (choix) {
            case '1':
                rl.question('Chemin du fichier à bloquer : ', async (fichier) => {
                    await bloquerFichier(fichier);
                    afficherMenu();
                });
                break;
            case '2':
                rl.question('Chemin du fichier à débloquer : ', async (fichier) => {
                    await debloquerFichier(fichier);
                    afficherMenu();
                });
                break;
            case '3':
                console.log('Au revoir !');
                rl.close();
                break;
            default:
                console.log('❌ Option invalide');
                afficherMenu();
        }
    });
}

// Bloque un fichier
async function bloquerFichier(fichierPath) {
    try {
        const cheminAbsolu = path.resolve(fichierPath);
        const nomFichier = path.basename(cheminAbsolu);
        
        // Vérifie si le fichier existe
        if (!fs.existsSync(cheminAbsolu)) {
            throw new Error(`Le fichier ${fichierPath} n'existe pas`);
        }
        
        // Vérifie si le fichier est déjà bloqué
        if (nomFichier.startsWith(PREFIX_BLOCAGE)) {
            throw new Error(`Le fichier ${fichierPath} est déjà bloqué`);
        }
        
        // Nouveau nom avec préfixe
        const nouveauNom = path.join(path.dirname(cheminAbsolu), PREFIX_BLOCAGE + nomFichier);
        
        // Lit le contenu du fichier
        const contenu = fs.readFileSync(cheminAbsolu, 'utf8');
        
        // Ajoute l'en-tête et écrit dans le nouveau fichier
        fs.writeFileSync(nouveauNom, HEADER_PROTECTION + contenu);
        
        // Supprime l'ancien fichier
        fs.unlinkSync(cheminAbsolu);
        
        // Met le fichier en lecture seule
        fs.chmodSync(nouveauNom, 0o444);
        
        console.log(`✅ Succès: ${fichierPath} a été bloqué et renommé en ${path.basename(nouveauNom)}`);
        console.log('Le fichier est maintenant en lecture seule.');
        
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
}

// Débloque un fichier
async function debloquerFichier(fichierPath) {
    try {
        const cheminAbsolu = path.resolve(fichierPath);
        const nomFichier = path.basename(cheminAbsolu);
        
        // Vérifie si le fichier existe
        if (!fs.existsSync(cheminAbsolu)) {
            throw new Error(`Le fichier ${fichierPath} n'existe pas`);
        }
        
        // Vérifie si le fichier est bien bloqué
        if (!nomFichier.startsWith(PREFIX_BLOCAGE)) {
            throw new Error(`Le fichier ${fichierPath} n'est pas bloqué`);
        }
        
        // Nouveau nom sans préfixe
        const nouveauNom = path.join(
            path.dirname(cheminAbsolu),
            nomFichier.substring(PREFIX_BLOCAGE.length)
        );
        
        // Rend le fichier modifiable
        fs.chmodSync(cheminAbsolu, 0o666);
        
        // Lit le contenu du fichier
        let contenu = fs.readFileSync(cheminAbsolu, 'utf8');
        
        // Retire l'en-tête de protection
        contenu = contenu.replace(HEADER_PROTECTION, '');
        
        // Écrit dans le nouveau fichier
        fs.writeFileSync(nouveauNom, contenu);
        
        // Supprime l'ancien fichier
        fs.unlinkSync(cheminAbsolu);
        
        console.log(`✅ Succès: ${fichierPath} a été débloqué et renommé en ${path.basename(nouveauNom)}`);
        console.log('Le fichier peut maintenant être modifié.');
        
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
}

// Lance le programme
main();
