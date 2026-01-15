# 🚨 Guide de Démarrage Rapide - Résolution des Problèmes

## Problème: Le serveur ne démarre pas correctement

### Solution 1: Redémarrer le serveur manuellement

1. **Arrêtez le serveur actuel** (Ctrl+C dans le terminal)

2. **Nettoyez et redémarrez**:
```powershell
cd c:\Users\DELL\Documents\uacnews\backend
npm run start:dev
```

3. **Attendez ce message**:
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] AppModule dependencies initialized
[Nest] LOG [RoutesResolver] AuthController {/api/auth}
[Nest] LOG [RoutesResolver] CatalogController {/api/catalog}
[Nest] LOG [NestApplication] Nest application successfully started
```

4. **Vérifiez que le serveur écoute**:
```
╔═══════════════════════════════════════════════════════════╗
║   Server running on: http://localhost:3000                ║
║   API Documentation: http://localhost:3000/api/docs      ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Solution 2: Vérifier les erreurs de compilation

Si vous voyez des erreurs TypeScript, voici les fichiers à vérifier:

### Fichier 1: `src/modules/catalog/catalog.service.ts`
Ligne 88-97 devrait ressembler à:
```typescript
async updateProduct(id: string, updateProductDto: UpdateProductDto) {
  const product = await this.findProductById(id);

  let updatedData = { ...updateProductDto };
  if (updateProductDto.name && updateProductDto.name !== product.name) {
    updatedData = {
      ...updatedData,
      slug: this.generateSlug(updateProductDto.name),
    } as any;
  }

  Object.assign(product, updatedData);
  return this.productRepository.save(product);
}
```

### Fichier 2: `src/modules/payment/payment.service.ts`
Lignes 8-30 devraient avoir des vérifications `if (!phone_number)`:
```typescript
async initiatePayment(initiatePaymentDto: InitiatePaymentDto) {
  const { provider, order_id, amount, phone_number } = initiatePaymentDto;

  switch (provider) {
    case PaymentProvider.MPESA:
      if (!phone_number) {
        throw new BadRequestException('Phone number required for M-Pesa');
      }
      return this.processMpesa(order_id, amount, phone_number);
    // ... etc
  }
}
```

---

## Solution 3: Tester l'API sans Swagger

Si Swagger ne fonctionne pas, testez directement avec PowerShell:

### 1. Vérifier que le serveur répond:
```powershell
curl http://localhost:3000/api/auth/register -Method GET
```

### 2. Créer un utilisateur:
```powershell
$body = @{
    full_name = "Test User"
    email = "test@uac.com"
    phone = "+243812345678"
    password = "Test123!"
} | ConvertTo-Json

curl http://localhost:3000/api/auth/register `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## Solution 4: Accéder à Swagger

Une fois le serveur démarré, essayez ces URLs:

1. **URL principale**: http://localhost:3000/api/docs
2. **URL alternative**: http://localhost:3000/api/docs/
3. **URL de base API**: http://localhost:3000/api

---

## Vérification Rapide

Exécutez ces commandes pour diagnostiquer:

```powershell
# 1. Vérifier si Node.js écoute sur le port 3000
netstat -ano | findstr :3000

# 2. Vérifier les processus Node.js
Get-Process node -ErrorAction SilentlyContinue

# 3. Tester la connexion
Test-NetConnection localhost -Port 3000
```

---

## Si rien ne fonctionne

### Option A: Réinstaller les dépendances
```powershell
cd c:\Users\DELL\Documents\uacnews\backend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install --legacy-peer-deps
npm run start:dev
```

### Option B: Vérifier le fichier .env
Assurez-vous que `.env` existe et contient:
```
NODE_ENV=development
PORT=3000
API_PREFIX=api
```

---

## 📞 Message d'Erreur Commun

Si vous voyez:
```
ERROR [TypeOrmModule] Unable to connect to the database
```

✅ **C'est normal avec SQLite!** Le serveur devrait quand même démarrer.

---

## 🎯 Prochaines Étapes

1. Arrêtez le serveur actuel (Ctrl+C)
2. Relancez: `npm run start:dev`
3. Attendez le message de succès
4. Ouvrez: http://localhost:3000/api/docs
5. Si ça ne marche toujours pas, partagez les logs du terminal
