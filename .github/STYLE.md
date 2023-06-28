# Conventions de style pour NestJS

Ce document décrit les conventions de style recommandées pour le développement avec NestJS. Il est important de maintenir une cohérence de style dans le code afin d'améliorer la lisibilité, la maintenabilité et la collaboration au sein du projet.

## Structure du projet

- Organisez votre projet en utilisant la structure recommandée par NestJS.
- Placez les contrôleurs, services, modules et autres artefacts dans des dossiers appropriés pour maintenir une structure claire et compréhensible.

## Conventions de nommage

- Utilisez la notation en PascalCase pour les noms de classes (par exemple, `UserService`, `ProductController`).
- Utilisez la notation en camelCase pour les noms de variables et de fonctions (par exemple, `userCount`, `getUser()`).
- Utilisez des noms significatifs et descriptifs pour vos classes, méthodes et variables.

## Architecture

- Respectez le principe de séparation des préoccupations (SoC) en déléguant des responsabilités spécifiques à chaque classe ou module.
- Utilisez les decorators fournis par NestJS pour annoter vos classes et faciliter la configuration.

## Manipulation des erreurs

- Utilisez les exceptions de NestJS (`HttpException`, `NotFoundException`, etc.) pour gérer les erreurs de manière cohérente.
- Personnalisez les messages d'erreur pour fournir des informations claires et utiles aux utilisateurs.

## Tests

- Écrivez des tests unitaires pour chaque module, service ou contrôleur.
- Utilisez les outils de test fournis par NestJS (`@nestjs/testing`) pour faciliter l'écriture et l'exécution des tests.

## Documentation

- Documentez votre code en utilisant des commentaires clairs et concis.
- Générez de la documentation automatique en utilisant les outils tels que Swagger ou Compodoc.

## Formatage du code

- Utilisez un outil de formatage de code tel que Prettier pour maintenir un style de code cohérent.
- Configurez votre éditeur pour respecter les règles de formatage définies par le projet.

Ces conventions de style visent à garantir une cohérence et une lisibilité accrues dans votre code NestJS. Veillez à les suivre tout en tenant compte des spécificités de votre projet et des besoins de votre équipe.
