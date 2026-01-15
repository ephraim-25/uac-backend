# PostgreSQL Installation Guide for Windows

## Option 1: Install PostgreSQL (Recommended)

### Download and Install
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Set password for `postgres` user (remember this!)
   - Default port: 5432
   - Install pgAdmin 4 (GUI tool)

### Create Database
After installation, open PowerShell and run:

```powershell
# Add PostgreSQL to PATH (adjust version number if needed)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create database:
CREATE DATABASE uac_rdc;
\q
```

### Update .env File
Edit `backend\.env` and update:
```
DB_PASSWORD=your_postgres_password_here
```

---

## Option 2: Use Docker (Alternative)

If you have Docker Desktop installed:

```powershell
# Run PostgreSQL in Docker
docker run --name uac-postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=uac_rdc `
  -p 5432:5432 `
  -d postgres:16

# Verify it's running
docker ps
```

---

## Option 3: Use SQLite for Development (Quick Start)

If you want to test immediately without PostgreSQL:

### 1. Install SQLite driver
```powershell
npm install sqlite3 --save
```

### 2. Update `src/app.module.ts`
Replace the TypeORM configuration with:

```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'uac_rdc.db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Auto-create tables
  logging: true,
}),
```

### 3. Restart the server
```powershell
npm run start:dev
```

---

## Verify Connection

Once PostgreSQL is running, restart your NestJS server:

```powershell
npm run start:dev
```

You should see:
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] TypeOrmModule dependencies initialized
```

No more connection errors!

---

## Next Steps

1. Access Swagger: http://localhost:3000/api/docs
2. Test authentication endpoints
3. Create sample products and categories
