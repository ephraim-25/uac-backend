# 🌱 Guide de Seeding - Base de Données UAC

## 📋 Vue d'Ensemble

Le système de seeding permet de peupler automatiquement la base de données avec un catalogue réaliste de produits UAC pour le marché congolais.

---

## 📦 Contenu du Seed

### Catégories (4)
1. **Énergie Solaire** - Solutions autonomes et hybrides
2. **Informatique** - Ordinateurs, serveurs et accessoires
3. **Électronique** - TV, Son et divertissement
4. **Gros Électroménager** - Frigos, cuisinières et climatisation

### Produits (18)

#### Énergie Solaire (4 produits)
- Kit Solaire UAC Home 5KVA - **$4,200**
- Kit Solaire UAC Business 10KVA - **$7,800**
- Projecteur LED Solaire 200W - **$85**
- Panneau Solaire 450W Monocristallin - **$280**

#### Informatique (4 produits)
- MacBook Pro 14" M3 Max - **$3,199**
- Dell Precision 5570 Workstation - **$2,450**
- Imprimante HP LaserJet Enterprise - **$550**
- Serveur Dell PowerEdge T340 - **$1,850**

#### Électronique (3 produits)
- Sony 75" BRAVIA XR 4K - **$2,400**
- Samsung 55" QLED Q80C - **$1,350**
- Bose SoundLink Revolve+ II - **$280**

#### Gros Électroménager (4 produits)
- Réfrigérateur Side-by-Side LG 600L - **$1,850**
- Climatiseur Split Inverter Midea 18000 BTU - **$680**
- Cuisinière Gaz Beko 5 Feux - **$520**
- Lave-linge Hisense 10kg Inverter - **$450**

---

## 🚀 Comment Exécuter le Seeding

### Prérequis
1. Serveur NestJS en cours d'exécution
2. Base de données SQLite/PostgreSQL configurée
3. Compte utilisateur avec rôle **ADMIN_DBH**

### Méthode 1: Via Swagger UI (Recommandé)

1. **Accédez à Swagger**: http://localhost:3000/api/docs

2. **Authentifiez-vous**:
   - Créez un compte admin ou utilisez un compte existant
   - Cliquez sur "Authorize"
   - Entrez votre token JWT

3. **Exécutez le seeding**:
   - Trouvez l'endpoint `POST /api/catalog/seed`
   - Cliquez sur "Try it out"
   - Cliquez sur "Execute"

4. **Vérifiez la réponse**:
```json
{
  "success": true,
  "message": "Base de données UAC peuplée avec succès !",
  "stats": {
    "categories": 4,
    "products_created": 18,
    "products_skipped": 0,
    "total_products": 18
  }
}
```

---

### Méthode 2: Via cURL

```bash
# 1. Obtenez votre token JWT (après login)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uac.com",
    "password": "your-password"
  }'

# 2. Exécutez le seeding
curl -X POST http://localhost:3000/api/catalog/seed \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

### Méthode 3: Via PowerShell

```powershell
# 1. Login et obtenir le token
$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@uac.com","password":"your-password"}'

$token = $loginResponse.access_token

# 2. Exécuter le seeding
Invoke-RestMethod -Uri "http://localhost:3000/api/catalog/seed" `
  -Method POST `
  -Headers @{"Authorization"="Bearer $token"}
```

---

## 🔒 Sécurité

### Restrictions d'Accès
- **Rôle requis**: `ADMIN_DBH` uniquement
- **Authentification**: JWT obligatoire
- **Protection**: Guards NestJS (AuthGuard + RolesGuard)

### Sécurité du Seeding
- ✅ **Idempotent**: Peut être exécuté plusieurs fois sans dupliquer
- ✅ **Vérification**: Vérifie l'existence avant création
- ✅ **Skip automatique**: Saute les produits existants
- ✅ **Rollback**: Utilise les transactions TypeORM

---

## 📊 Vérification Post-Seeding

### 1. Vérifier les Catégories

```http
GET /api/catalog/categories
```

Devrait retourner 4 catégories.

### 2. Vérifier les Produits

```http
GET /api/catalog/products?page=1&limit=20
```

Devrait retourner 18 produits au total.

### 3. Vérifier un Produit Spécifique

```http
GET /api/catalog/products/kit-solaire-uac-home-5kva
```

---

## 🔄 Re-seeding

Si vous voulez réinitialiser complètement:

### Option 1: Supprimer et Re-seed
```sql
-- SQLite
DELETE FROM products;
DELETE FROM categories;

-- Puis relancez le seeding
```

### Option 2: Le seeding est intelligent
- Il **skip** les produits existants (par slug)
- Vous pouvez le relancer sans problème
- Seuls les nouveaux produits seront ajoutés

---

## 🎨 Personnalisation

### Modifier les Données

Éditez `src/modules/catalog/catalog.seed.ts`:

```typescript
export const UAC_SEED_DATA = {
  categories: [
    // Ajoutez vos catégories
  ],
  products: [
    {
      name: "Votre Produit",
      description: "Description",
      base_price_usd: 999.00,
      categoryName: "Catégorie Existante",
      images: ["https://..."],
      specifications: { ... }
    }
  ]
};
```

### Ajouter de Nouveaux Produits

1. Ajoutez l'objet produit dans `UAC_SEED_DATA.products`
2. Relancez le seeding
3. Seul le nouveau produit sera créé

---

## 🐛 Dépannage

### Erreur: "Forbidden - DBH Admin access required"
**Solution**: Votre compte n'a pas le rôle `ADMIN_DBH`

Mettez à jour manuellement dans la base de données:
```sql
UPDATE users SET role = 'ADMIN_DBH' WHERE email = 'votre@email.com';
```

### Erreur: "Category not found"
**Solution**: Vérifiez que `categoryName` dans les produits correspond exactement au `name` des catégories.

### Produits non créés
**Solution**: Vérifiez les logs du serveur pour voir les warnings.

---

## 📈 Statistiques de Réponse

```json
{
  "success": true,
  "message": "Base de données UAC peuplée avec succès !",
  "stats": {
    "categories": 4,           // Catégories créées
    "products_created": 18,    // Nouveaux produits
    "products_skipped": 0,     // Produits existants
    "total_products": 18       // Total dans le seed
  }
}
```

---

## ✅ Checklist Post-Seeding

- [ ] 4 catégories créées
- [ ] 18 produits créés
- [ ] Images Unsplash chargées
- [ ] Spécifications JSONB correctes
- [ ] Slugs générés automatiquement
- [ ] Prix en USD corrects
- [ ] Descriptions en français

---

## 🎯 Prochaines Étapes

Après le seeding:

1. **Testez le frontend**: Les produits devraient apparaître
2. **Vérifiez les images**: Unsplash devrait charger les images
3. **Testez la recherche**: Par catégorie, par slug
4. **Créez des commandes**: Testez le flux complet

---

**Créé par**: Dark Business Hi-Tech  
**Date**: Janvier 2026  
**Status**: ✅ Prêt pour production
