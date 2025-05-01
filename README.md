# Klikx - Agence de Modélisation 3D

Site web pour Klikx, une agence spécialisée dans la création de visuels 3D réalistes pour les locations Airbnb et les conciergeries.

## Configuration pour Infomaniak

Pour permettre l'envoi d'emails via le formulaire de contact lors du déploiement sur Infomaniak, suivez ces étapes :

1. Installer les dépendances nécessaires :
   ```bash
   bun add nodemailer
   bun add @types/nodemailer --dev
   ```

2. Configuration sécurisée (IMPORTANT) :
   - Ne stockez JAMAIS vos identifiants SMTP dans le code source
   - Créez un fichier `.env.local` à la racine du projet (ce fichier n'est pas versionné par Git) :
     ```
     EMAIL_SERVER=mail.infomaniak.com
     EMAIL_PORT=587
     EMAIL_USER=votre_adresse@votre_domaine.com
     EMAIL_PASSWORD=votre_mot_de_passe_ici
     EMAIL_FROM=votre_adresse@votre_domaine.com
     ```
   - Pour le déploiement sur Infomaniak ou tout autre hébergeur, configurez ces variables d'environnement dans leur interface

3. Dans le panneau de contrôle Infomaniak, assurez-vous que :
   - Le serveur SMTP est activé pour votre domaine
   - Les ports 587 ou 465 sont ouverts
   - Vous avez configuré les variables d'environnement dans l'interface d'hébergement

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Développement

```bash
# Installer les dépendances
bun install

# Démarrer le serveur de développement
bun run dev
```

## Production

```bash
# Construire l'application pour la production
bun run build

# Démarrer le serveur de production
bun run start
```

## Déploiement

Pour déployer sur Infomaniak :

1. Créez votre site dans le manager Infomaniak
2. Configurez votre domaine
3. Utilisez Git ou FTP pour télécharger les fichiers de l'application
4. Configurez votre hébergement pour exécuter l'application Node.js
