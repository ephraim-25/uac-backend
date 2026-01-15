# UAC RDC Backend

Enterprise-grade e-commerce backend for UAC RDC, built with NestJS and powered by Dark Business Hi-Tech.

## 🚀 Features

- **Modular Architecture**: 6 independent modules (Auth, Catalog, Inventory, Order, Payment, Analytics)
- **Security First**: Argon2 password hashing, JWT authentication, role-based access control
- **TypeORM + PostgreSQL**: Type-safe database operations with migrations
- **Swagger Documentation**: Interactive API documentation at `/api/docs`
- **Multi-Location Inventory**: Real-time stock tracking across DRC cities
- **Payment Integration**: Support for M-Pesa, Orange Money, Airtel Money, and Stripe

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Create PostgreSQL database**:
```sql
CREATE DATABASE uac_rdc;
```

4. **Run database migrations** (when available):
```bash
npm run migration:run
```

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the interactive Swagger documentation at:

```
http://localhost:3000/api/docs
```

## 🔐 Authentication Flow

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login` (returns JWT token)
3. **Use Token**: Add `Authorization: Bearer <token>` header to protected routes

## 📦 Module Overview

### AuthModule
- User registration and login
- JWT token generation
- Role-based access control (CUSTOMER, ADMIN_UAC, ADMIN_DBH)
- Argon2 password hashing

### CatalogModule
- Product CRUD operations
- Category management
- Automatic slug generation
- JSONB specifications support

### InventoryModule
- Multi-location stock tracking
- Real-time inventory updates
- Stock aggregation across locations

### OrderModule
- Order creation and tracking
- Automatic tracking number generation
- Order lifecycle management (PENDING → CONFIRMED → SHIPPED → DELIVERED)

### PaymentModule
- Mobile Money integration (M-Pesa, Orange Money, Airtel Money)
- Stripe integration
- Webhook handlers for payment confirmations

## 🗄️ Database Schema

Key entities:
- **users**: User accounts with roles
- **products**: Product catalog with JSONB specifications
- **categories**: Product categories
- **inventory**: Multi-location stock records
- **orders**: Order records with JSONB items and delivery address

## 🔒 Security Features

- **Argon2 Password Hashing**: Industry-leading password security
- **JWT Authentication**: Stateless authentication
- **Role Guards**: Protect admin-only endpoints
- **Input Validation**: class-validator on all DTOs
- **CORS Configuration**: Configurable cross-origin requests

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run migration:generate` - Generate migration from entities
- `npm run migration:run` - Run pending migrations
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_DATABASE` | Database name | `uac_rdc` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRATION` | Token expiration | `7d` |

## 👥 User Roles

- **CUSTOMER**: Regular users who can browse and order
- **ADMIN_UAC**: UAC administrators with full product/order management
- **ADMIN_DBH**: Dark Business Hi-Tech administrators with system-wide access

## 🚧 TODO

- [ ] Implement actual payment gateway integrations
- [ ] Add Redis caching for product catalog
- [ ] Implement analytics module
- [ ] Add email notifications
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting
- [ ] Implement search functionality

## 📄 License

Proprietary - Dark Business Hi-Tech © 2026

## 🤝 Support

For support, contact Dark Business Hi-Tech technical team.

---

**Built with ❤️ by Dark Business Hi-Tech**
