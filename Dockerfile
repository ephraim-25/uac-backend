# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code
COPY . .

# Construction de l'application NestJS
RUN npm run build

# Étape 2 : Exécution
FROM node:20-alpine

WORKDIR /app

# On ne copie que ce qui est nécessaire pour l'exécution
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exposition du port 3000
EXPOSE 3000

# Commande de lancement
CMD ["npm", "run", "start:prod"]
