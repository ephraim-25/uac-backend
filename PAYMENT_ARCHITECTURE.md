# 🏗️ Payment Strategy Pattern - Architecture Documentation

## 📋 Vue d'Ensemble

Le **PaymentModule** a été refactoré pour utiliser le **Strategy Pattern**, rendant l'ajout de nouveaux modes de paiement ultra-modulaire sans toucher à la logique des commandes (OrderModule).

---

## 🎯 Architecture

### Structure des Fichiers

```
src/modules/payment/
├── interfaces/
│   └── payment-provider.interface.ts    # Interface de base
├── providers/
│   ├── moko-africa.provider.ts          # Mobile Money (DRC)
│   └── stripe.provider.ts               # Paiements par carte
├── factories/
│   └── payment.factory.ts               # Sélection du provider
├── dto/
│   └── payment.dto.ts                   # DTOs mis à jour
├── payment.service.ts                   # Service refactoré
├── payment.controller.ts                # Controller mis à jour
└── payment.module.ts                    # Module avec DI
```

---

## 🔌 Interface PaymentProvider

Tous les providers implémentent cette interface:

```typescript
export interface PaymentProvider {
  initiatePayment(orderData: any): Promise<PaymentResponse>;
  verifyWebhook(payload: any, signature: string): Promise<boolean>;
  getProviderName(): string;
}
```

### PaymentResponse

```typescript
{
  status: 'pending' | 'success' | 'failed';
  transaction_id?: string;
  checkout_url?: string;
  message: string;
  provider: string;
  metadata?: Record<string, any>;
}
```

---

## 💳 Providers Implémentés

### 1. MokoAfricaProvider

**Usage**: Mobile Money pour la RDC (M-Pesa, Orange Money, Airtel Money)

**Variables d'environnement**:
```bash
MOKO_API_KEY=your-moko-api-key-here
MOKO_WEBHOOK_SECRET=your-moko-webhook-secret-here
MOKO_API_URL=https://api.mokoafrica.com/v1
```

**Méthodes**:
- `initiatePayment()` - Initie un paiement Mobile Money
- `verifyWebhook()` - Vérifie la signature HMAC du webhook

**Status**: TODO - Intégration API à compléter

---

### 2. StripeProvider

**Usage**: Paiements par carte bancaire

**Variables d'environnement**:
```bash
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret-here
```

**Méthodes**:
- `initiatePayment()` - Crée une Checkout Session Stripe
- `verifyWebhook()` - Vérifie la signature Stripe

**Status**: TODO - Intégration Stripe SDK à compléter

---

## 🏭 PaymentFactory

La factory sélectionne automatiquement le bon provider:

```typescript
// Sélection par méthode de paiement
const provider = paymentFactory.getProvider('MOBILE_MONEY'); // → MokoAfricaProvider
const provider = paymentFactory.getProvider('CARD');         // → StripeProvider

// Sélection par nom (pour webhooks)
const provider = paymentFactory.getProviderByName('moko_africa');
const provider = paymentFactory.getProviderByName('stripe');
```

---

## 🔄 Flux de Paiement

### 1. Initiation du Paiement

```http
POST /api/payments/initiate
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "order_id": "uuid",
  "payment_method": "MOBILE_MONEY",  // ou "CARD"
  "amount": 5000.00,
  "phone_number": "+243812345678",   // requis pour MOBILE_MONEY
  "customer_email": "user@email.com" // requis pour CARD
}
```

**Réponse**:
```json
{
  "status": "pending",
  "transaction_id": "MOKO-1234567890",
  "message": "Payment initiated via Moko Africa...",
  "provider": "moko_africa",
  "metadata": { ... }
}
```

---

### 2. Webhook de Confirmation

```http
POST /api/payments/webhook/moko_africa
X-Signature: <signature_hmac>
Content-Type: application/json

{
  "transaction_id": "MOKO-1234567890",
  "status": "success",
  "order_id": "uuid",
  ...
}
```

Le service:
1. Récupère le provider par nom
2. Vérifie la signature du webhook
3. Traite le paiement (TODO: mettre à jour la commande)

---

## 📝 Nouveaux DTOs

### PaymentMethod Enum

```typescript
enum PaymentMethod {
  MOBILE_MONEY = 'MOBILE_MONEY',
  CARD = 'CARD',
}
```

### InitiatePaymentDto

```typescript
{
  order_id: string;
  payment_method: 'MOBILE_MONEY' | 'CARD';
  amount: number;
  phone_number?: string;      // optionnel
  customer_email?: string;    // optionnel
}
```

---

## 🆕 Ajouter un Nouveau Provider

### Étape 1: Créer le Provider

```typescript
// src/modules/payment/providers/new-provider.provider.ts
import { Injectable } from '@nestjs/common';
import { PaymentProvider, PaymentResponse } from '../interfaces/payment-provider.interface';

@Injectable()
export class NewProvider implements PaymentProvider {
  async initiatePayment(orderData: any): Promise<PaymentResponse> {
    // Votre logique ici
  }

  async verifyWebhook(payload: any, signature: string): Promise<boolean> {
    // Votre logique ici
  }

  getProviderName(): string {
    return 'new_provider';
  }
}
```

### Étape 2: Enregistrer dans la Factory

```typescript
// payment.factory.ts
case 'NEW_METHOD':
  return this.newProvider;
```

### Étape 3: Ajouter au Module

```typescript
// payment.module.ts
providers: [
  PaymentService,
  PaymentFactory,
  MokoAfricaProvider,
  StripeProvider,
  NewProvider,  // ← Ajouter ici
],
```

### Étape 4: Mettre à jour l'Enum

```typescript
// payment.dto.ts
enum PaymentMethod {
  MOBILE_MONEY = 'MOBILE_MONEY',
  CARD = 'CARD',
  NEW_METHOD = 'NEW_METHOD',  // ← Ajouter ici
}
```

**C'est tout !** Aucune modification dans OrderModule ou ailleurs.

---

## 🧪 Tester l'Architecture

### 1. Obtenir les méthodes disponibles

```http
GET /api/payments/methods
```

**Réponse**:
```json
{
  "payment_methods": ["MOBILE_MONEY", "CARD"]
}
```

### 2. Tester Mobile Money

```http
POST /api/payments/initiate
{
  "order_id": "test-order-123",
  "payment_method": "MOBILE_MONEY",
  "amount": 100.00,
  "phone_number": "+243812345678"
}
```

### 3. Tester Carte Bancaire

```http
POST /api/payments/initiate
{
  "order_id": "test-order-456",
  "payment_method": "CARD",
  "amount": 200.00,
  "customer_email": "test@example.com"
}
```

---

## 🔐 Sécurité

### Vérification des Webhooks

Chaque provider vérifie la signature du webhook:

**Moko Africa**: HMAC SHA-256
```typescript
const expectedSignature = crypto
  .createHmac('sha256', MOKO_WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');
```

**Stripe**: Utilise `stripe.webhooks.constructEvent()`

---

## 📊 Avantages du Strategy Pattern

✅ **Modularité**: Chaque provider est indépendant  
✅ **Extensibilité**: Ajouter un provider = 4 étapes simples  
✅ **Testabilité**: Chaque provider peut être testé isolément  
✅ **Maintenabilité**: Pas de switch/case géant  
✅ **Séparation des préoccupations**: OrderModule ne connaît pas les détails de paiement  

---

## 🚀 Prochaines Étapes

### TODO: Intégration Moko Africa
1. Obtenir les credentials API
2. Implémenter l'appel API dans `initiatePayment()`
3. Implémenter la vérification HMAC dans `verifyWebhook()`
4. Tester avec l'environnement sandbox

### TODO: Intégration Stripe
1. Installer `stripe` npm package
2. Implémenter Checkout Session
3. Configurer les webhooks Stripe
4. Tester avec les clés de test

### TODO: Traitement des Webhooks
1. Mettre à jour le statut de la commande
2. Envoyer email de confirmation
3. Déclencher la mise à jour de l'inventaire
4. Logger les transactions

---

## 📚 Références

- **Moko Africa**: https://docs.mokoafrica.com/
- **Stripe**: https://stripe.com/docs/api
- **Strategy Pattern**: https://refactoring.guru/design-patterns/strategy

---

**Implémenté par**: Dark Business Hi-Tech  
**Date**: Janvier 2026  
**Status**: ✅ Architecture complète, intégrations API à finaliser
