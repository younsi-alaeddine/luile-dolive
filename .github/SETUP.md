# Configuration GitHub Repository

## Comment ajouter Description, Website et Topics sur GitHub

### Méthode 1 : Via l'interface GitHub (Recommandé)

1. **Aller sur votre dépôt** : https://github.com/younsi-alaeddine/luile-dolive
2. **Cliquer sur l'icône ⚙️ (Settings)** en haut à droite du dépôt
3. **Aller dans la section "General"** (par défaut)
4. **Remplir les champs** :

#### Description
```
Site web présentant 10 propositions de noms commerciaux authentiques et mémorables pour une marque d'huile d'olive premium tunisienne.
```

#### Website
```
https://younsi-alaeddine.github.io/luile-dolive/
```
*(Note: Activez GitHub Pages dans Settings > Pages si vous voulez héberger le site)*

#### Topics (Tags)
Copiez-collez ces topics un par un :
- html
- css
- javascript
- web-design
- branding
- olive-oil
- tunisia
- commercial-names
- premium
- responsive-design
- bilingual
- dark-mode
- marketing
- business
- arabic
- french
- frontend
- web-development

5. **Cliquer sur "Save"**

### Méthode 2 : Via GitHub CLI

Si vous avez GitHub CLI installé :

```bash
gh repo edit younsi-alaeddine/luile-dolive \
  --description "Site web présentant 10 propositions de noms commerciaux authentiques et mémorables pour une marque d'huile d'olive premium tunisienne." \
  --homepage "https://younsi-alaeddine.github.io/luile-dolive/" \
  --add-topic html,css,javascript,web-design,branding,olive-oil,tunisia,commercial-names,premium,responsive-design,bilingual,dark-mode,marketing,business,arabic,french,frontend,web-development
```

### Activer GitHub Pages (Optionnel)

Pour héberger le site web sur GitHub Pages :

1. **Aller dans Settings > Pages**
2. **Source** : Sélectionner "Deploy from a branch"
3. **Branch** : Sélectionner "main" et "/ (root)"
4. **Cliquer sur "Save"**
5. Votre site sera disponible à : `https://younsi-alaeddine.github.io/luile-dolive/`

---

**Note** : Les fichiers `.github/description.txt` et `.github/TOPICS.md` sont des références. La configuration doit être faite directement sur GitHub via l'interface ou GitHub CLI.

