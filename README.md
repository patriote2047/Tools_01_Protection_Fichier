# 🔒 Utilitaire de Protection des Fichiers

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/votre-repo)
[![Node.js](https://img.shields.io/badge/Node.js-v12%2B-green.svg)](https://nodejs.org)
[![Licence](https://img.shields.io/badge/licence-MIT-orange.svg)](LICENSE)
[![Statut](https://img.shields.io/badge/statut-stable-success.svg)](https://github.com/votre-repo)

> 🛡️ Protégez vos fichiers contre les modifications accidentelles en les rendant en lecture seule et en ajoutant un en-tête d'avertissement.

## ✨ Fonctionnalités

- 🔐 **Bloquer un fichier** :
  - Ajoute un préfixe "BLOQUER_" au nom du fichier
  - Rend le fichier en lecture seule
  - Ajoute un en-tête d'avertissement au début du fichier
- 🔓 **Débloquer un fichier** :
  - Retire le préfixe "BLOQUER_"
  - Rend le fichier modifiable
  - Retire l'en-tête d'avertissement

## 📋 Prérequis

- 📦 Node.js installé sur votre système

## 🚀 Installation

1. Clonez ou téléchargez ce répertoire
2. Aucune installation supplémentaire n'est nécessaire

## 💻 Utilisation

### Mode Interactif

1. Double-cliquez sur `PROTECTION_FICHIERS.bat` dans le dossier `outil_1_protection-fichier`
2. Suivez les instructions du menu :
   - 🔒 Option 1 : Bloquer un fichier
   - 🔓 Option 2 : Débloquer un fichier
   - 🚪 Option 3 : Quitter

### Mode Ligne de Commande

Depuis le dossier `outil_1_protection-fichier` :

```bash
PROTECTION_FICHIERS.bat [commande] [chemin_fichier]
```

#### 🎯 Commandes disponibles
- `bloquer` ou `b` : Bloque le fichier spécifié
- `debloquer` ou `d` : Débloque le fichier spécifié

#### 📝 Exemples
```bash
PROTECTION_FICHIERS.bat bloquer mon_fichier.txt
PROTECTION_FICHIERS.bat b mon_fichier.txt
PROTECTION_FICHIERS.bat debloquer BLOQUER_mon_fichier.txt
PROTECTION_FICHIERS.bat d BLOQUER_mon_fichier.txt
```

## 📁 Structure du Projet

```
outil_1_protection-fichier/
├── 🚀 PROTECTION_FICHIERS.bat   # Script de lancement Windows (55 bytes)
├── 💻 protection_fichiers.js    # Code source principal (5.3 KB)
└── 📖 README.md                 # Documentation (4.9 KB)
```

## ⚙️ Fonctionnement

Lorsqu'un fichier est bloqué :
1. 📝 Le fichier est renommé avec le préfixe "BLOQUER_"
2. 🔒 Les permissions sont modifiées pour le rendre en lecture seule
3. ⚠️ Un en-tête est ajouté au début du fichier pour avertir les utilisateurs

> ℹ️ Pour modifier un fichier bloqué, il faut d'abord le débloquer avec l'utilitaire, faire les modifications nécessaires, puis le bloquer à nouveau.

## 🔍 Chemins Relatifs et Absolus

L'utilitaire accepte les deux types de chemins :
- 📍 Relatifs : `./mon_fichier.js` ou simplement `mon_fichier.js`
- 🌐 Absolus : `C:/mon_dossier/mon_fichier.js`

## 📢 Messages et Codes d'Erreur

- ✅ **Succès** : Le fichier a été bloqué/débloqué avec succès
- ❌ **Erreur** : 
  * 🚫 Fichier inexistant
  * 🔒 Fichier déjà bloqué
  * 🔓 Fichier non bloqué (pour le déblocage)

## 🛡️ Sécurité

- 🔒 Les fichiers bloqués sont en lecture seule
- ⚠️ Un en-tête visuel indique clairement le statut du fichier
- 🔐 La modification nécessite une action explicite de déblocage

## Journal des Erreurs et Solutions

### 1. Installation et Structure
**Problème** : Installation dispersée avec plusieurs fichiers à différents endroits.  
**Solution** : Centralisation de tous les fichiers dans un dossier `outils` pour une meilleure organisation.

### 2. Chemins Relatifs
**Problème** : Les chemins absolus rendaient l'utilitaire difficile à déplacer.  
**Solution** : 
- Utilisation de `path.resolve()` pour gérer les chemins relatifs
- Support des chemins relatifs comme `./fichier.js` ou juste `fichier.js`
- Utilisation de `%~dp0` dans le batch pour le chemin du script

### 3. Mode Interactif vs Ligne de Commande
**Problème** : L'utilitaire n'était pas flexible dans son utilisation.  
**Solution** : 
- Ajout d'un menu interactif
- Support des arguments en ligne de commande
- Détection automatique du mode à utiliser

### 4. Terminologie
**Problème** : Confusion entre "PROTEGE" et "BLOQUER" dans les noms de fichiers.  
**Solution** : 
- Standardisation sur "BLOQUER_" comme préfixe
- Mise à jour de tous les messages et commentaires
- Documentation cohérente

### 5. Messages d'Erreur
**Problème** : Messages peu clairs ou incomplets.  
**Solution** : 
- Messages d'erreur plus descriptifs
- Utilisation d'émojis (✅/❌) pour la clarté visuelle
- Instructions précises pour résoudre chaque erreur

### 6. Gestion des Fichiers
**Problème** : Risque de perte de données lors des opérations.  
**Solution** : 
- Vérifications avant chaque opération
- Validation des fichiers existants
- Confirmation avant les actions destructives

### 7. Compatibilité Windows
**Problème** : Problèmes avec les attributs de fichiers sous Windows.  
**Solution** : 
- Utilisation de `fs.constants.S_IWUSR` pour la lecture seule
- Gestion correcte des chemins Windows avec `path.join()`
- Support des backslashes et forwardslashes

### 8. Interface Utilisateur
**Problème** : Commandes peu intuitives.  
**Solution** : 
- Menu numéroté simple (1-2-3)
- Raccourcis pour les commandes (b/d)
- Messages d'aide intégrés

### 9. Maintenance
**Problème** : Code difficile à maintenir avec plusieurs fichiers.  
**Solution** : 
- Un seul fichier JavaScript principal
- Code modulaire avec fonctions séparées
- Documentation inline détaillée
