# Portfolio Data / IA (statique)

Site statique généré à partir de `documentation/annexes.md`.

## Lancer en local

Ouvrir `index.html` directement, ou utiliser un serveur local simple.

Exemple Python:

```powershell
cd portfolio-site
python -m http.server 8000
```

Puis ouvrir http://localhost:8000

## Déployer sur Netlify

1. Créer un dépôt GitHub avec le contenu de `portfolio-site`.
2. Sur Netlify: Add new site -> Import from Git.
3. Build command: (laisser vide)
4. Publish directory: `/`
5. Déployer.

## Déployer sur Vercel

1. Importer le dépôt.
2. Framework Preset: Other.
3. Build command: vide.
4. Output directory: `.`
5. Deploy.
