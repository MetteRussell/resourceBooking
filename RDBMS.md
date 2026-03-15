# Migration Guide: JSON Server to PostgreSQL

## Overview

This guide documents the migration path from JSON Server to a PostgreSQL relational database for the NBV Resource Booking System.

## Current Architecture Analysis

### JSON Server Setup
- **Database**: Single `db.json` file
- **Collections**: 4 main collections (users, materials, allMaterials, reservedDates)
- **Relationships**: Managed through IDs in arrays
- **API**: Auto-generated REST endpoints via JSON Server
- **Persistence**: File-based storage

### Data Structure
```json
{
  "users": [{ "id": "uuid", "name": "email", "isAdmin": "yes/no" }],
  "materials": [{ "id": "uuid", "userId": "uuid", "materialId": "uuid" }],
  "allMaterials": [{ "id": "uuid", "name": "string", "category": "string" }],
  "reservedDates": [{ "id": "uuid", "userId": "uuid", "materialId": "uuid", "date": "string" }]
}
```

## Migration Complexity: Medium (5/10)

### Why It's Manageable
1. **Clean Frontend**: RTK Query API layer is well-structured
2. **Docker Ready**: Already containerized infrastructure
3. **Simple Relations**: Straightforward one-to-many and many-to-many relationships
4. **REST Pattern**: Existing API follows REST conventions

### Main Challenges
1. **Backend Rewrite**: Need Express.js to replace JSON Server
2. **Schema Design**: Convert flat structure to normalized tables
3. **Data Migration**: Transfer existing data with ID preservation
4. **Query Optimization**: Implement proper JOINs and indexes

## Target PostgreSQL Schema

### Database Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Materials catalog (all available materials)
CREATE TABLE materials_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User materials (materials selected by users)
CREATE TABLE user_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    material_id UUID NOT NULL REFERENCES materials_catalog(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, material_id)
);

-- Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    material_id UUID NOT NULL REFERENCES materials_catalog(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(material_id, reservation_date)
);

-- Indexes for performance
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_user_materials_user ON user_materials(user_id);
```

## Technology Stack

### Recommended Stack
- **Database**: PostgreSQL 15+
- **ORM**: Prisma (recommended) or TypeORM
- **Backend**: Express.js + TypeScript
- **Connection**: pg library with connection pooling
- **Migrations**: Prisma Migrate or Knex.js

### Alternative Options
1. **Lightweight**: Express + raw pg queries
2. **Enterprise**: NestJS + TypeORM
3. **Modern**: Fastify + Prisma

## Implementation Plan

### Phase 1: Database Setup (Day 1)

#### 1.1 Add PostgreSQL to Docker Compose
```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: nbv-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: nbv_booking
      POSTGRES_USER: ${DB_USER:-nbv_user}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secure_password}
    ports:
      - "5432:5432"
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    networks:
      - nbv-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U nbv_user"]
      interval: 30s
      timeout: 10s
      retries: 5
```

#### 1.2 Initialize Database
```bash
# Connect to PostgreSQL
docker exec -it nbv-postgres psql -U nbv_user -d nbv_booking

# Run schema creation script
docker exec -i nbv-postgres psql -U nbv_user -d nbv_booking < schema.sql
```

### Phase 2: Express Backend (Day 2-3)

#### 2.1 Project Structure
```
backend-express/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── users.controller.ts
│   │   ├── materials.controller.ts
│   │   └── reservations.controller.ts
│   ├── routes/
│   │   └── index.ts
│   ├── models/
│   │   └── index.ts
│   ├── middleware/
│   │   └── error.middleware.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── Dockerfile
```

#### 2.2 Express Server Example
```typescript
// app.ts
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: 5432,
  database: 'nbv_booking',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.use(cors());
app.use(express.json());

// Users endpoint
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Materials endpoint
app.get('/allMaterials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materials_catalog WHERE is_active = true');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Reservations endpoint with JOIN
app.get('/reservedDates', async (req, res) => {
  const { userId, materialId } = req.query;
  
  let query = `
    SELECT r.*, u.email as user_email, m.name as material_name
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN materials_catalog m ON r.material_id = m.id
    WHERE 1=1
  `;
  
  const params = [];
  if (userId) {
    params.push(userId);
    query += ` AND r.user_id = $${params.length}`;
  }
  if (materialId) {
    params.push(materialId);
    query += ` AND r.material_id = $${params.length}`;
  }
  
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Phase 3: Data Migration (Day 4)

#### 3.1 Migration Script
```javascript
// migrate.js
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'nbv_booking',
  user: 'nbv_user',
  password: 'secure_password'
});

async function migrate() {
  // Read existing data
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
  
  // Migrate users
  for (const user of data.users) {
    await pool.query(
      'INSERT INTO users (id, email, is_admin) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
      [user.id, user.name, user.isAdmin === 'yes']
    );
  }
  
  // Migrate materials catalog
  for (const material of data.allMaterials) {
    await pool.query(
      'INSERT INTO materials_catalog (id, name, category) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
      [material.id, material.name, material.category || 'General']
    );
  }
  
  // Migrate user materials
  for (const userMaterial of data.materials) {
    await pool.query(
      'INSERT INTO user_materials (user_id, material_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userMaterial.userId, userMaterial.id]
    );
  }
  
  // Migrate reservations
  for (const reservation of data.reservedDates) {
    await pool.query(
      'INSERT INTO reservations (user_id, material_id, reservation_date) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [reservation.userId, reservation.materialId, reservation.date]
    );
  }
  
  console.log('Migration completed successfully');
  pool.end();
}

migrate().catch(console.error);
```

### Phase 4: Frontend Updates (Day 5)

#### 4.1 Minimal Changes Required
Since the API endpoints remain the same, minimal frontend changes are needed:

1. **ID Format**: Update to handle UUIDs instead of short IDs
2. **Date Format**: Ensure consistent date formatting
3. **Response Structure**: Adapt to any new nested data from JOINs

#### 4.2 Optional Enhancements
```javascript
// Update store API to handle new response structure
fetchReservedDates: builder.query({
  query: ({ userId, materialId }) => ({
    url: '/reservedDates',
    params: { userId, materialId },
  }),
  transformResponse: (response) => {
    // Handle new joined data structure
    return response.map(reservation => ({
      ...reservation,
      userName: reservation.user_email,
      materialName: reservation.material_name
    }));
  },
}),
```

### Phase 5: Testing & Deployment (Day 6-7)

#### 5.1 Testing Strategy
1. **Unit Tests**: Test each endpoint individually
2. **Integration Tests**: Test complete workflows
3. **Performance Tests**: Compare with JSON Server baseline
4. **Data Validation**: Ensure all data migrated correctly

#### 5.2 Parallel Running
```yaml
# docker-compose.yml
services:
  backend-json:  # Keep existing JSON Server
    ports:
      - "3005:3005"
  
  backend-pg:    # New PostgreSQL backend
    ports:
      - "3006:3005"  # Different external port, same internal
```

#### 5.3 Gradual Migration
1. Run both backends simultaneously
2. Use feature flags to switch between APIs
3. Monitor and compare responses
4. Gradually move traffic to new backend

## Using Prisma ORM (Alternative Approach)

### Prisma Schema
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String         @id @default(uuid())
  email        String         @unique
  isAdmin      Boolean        @default(false)
  materials    UserMaterial[]
  reservations Reservation[]
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}

model Material {
  id           String         @id @default(uuid())
  name         String
  description  String?
  category     String?
  isActive     Boolean        @default(true)
  userMaterials UserMaterial[]
  reservations  Reservation[]
  createdAt    DateTime       @default(now())
}

model UserMaterial {
  id         String   @id @default(uuid())
  userId     String
  materialId String
  user       User     @relation(fields: [userId], references: [id])
  material   Material @relation(fields: [materialId], references: [id])
  addedAt    DateTime @default(now())
  
  @@unique([userId, materialId])
}

model Reservation {
  id         String   @id @default(uuid())
  userId     String
  materialId String
  date       DateTime
  status     String   @default("active")
  notes      String?
  user       User     @relation(fields: [userId], references: [id])
  material   Material @relation(fields: [materialId], references: [id])
  createdAt  DateTime @default(now())
  
  @@unique([materialId, date])
}
```

### Prisma Implementation
```typescript
// Using Prisma Client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all reservations with relations
app.get('/reservedDates', async (req, res) => {
  const reservations = await prisma.reservation.findMany({
    include: {
      user: true,
      material: true,
    },
    where: {
      userId: req.query.userId,
      materialId: req.query.materialId,
    }
  });
  res.json(reservations);
});

// Create reservation with transaction
app.post('/reservedDates', async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    // Check if date is available
    const existing = await tx.reservation.findFirst({
      where: {
        materialId: req.body.materialId,
        date: new Date(req.body.date),
      }
    });
    
    if (existing) {
      throw new Error('Date already reserved');
    }
    
    // Create reservation
    return await tx.reservation.create({
      data: {
        userId: req.body.userId,
        materialId: req.body.materialId,
        date: new Date(req.body.date),
      }
    });
  });
  
  res.json(result);
});
```

## Rollback Plan

### Backup Strategy
1. **Before Migration**: Full backup of db.json
2. **Database Dumps**: Regular PostgreSQL dumps
3. **Version Control**: Tag releases before/after migration

### Rollback Steps
```bash
# 1. Stop new backend
docker compose stop backend-pg

# 2. Switch back to JSON Server
docker compose up -d backend-json

# 3. Restore db.json if needed
cp backup/db.json.backup ./data/db/db.json

# 4. Update frontend config to use old API
```

## Performance Comparison

| Metric | JSON Server | PostgreSQL |
|--------|------------|------------|
| Concurrent Users | ~10 | 100+ |
| Query Speed (simple) | 5-10ms | 1-3ms |
| Query Speed (complex) | 50-100ms | 5-15ms |
| Data Integrity | None | ACID compliant |
| Backup/Recovery | Manual | Built-in tools |
| Scalability | Limited | Horizontal/Vertical |

## Migration Checklist

- [ ] Set up PostgreSQL container
- [ ] Create database schema
- [ ] Develop Express backend
- [ ] Implement all API endpoints
- [ ] Write migration scripts
- [ ] Migrate existing data
- [ ] Test all endpoints
- [ ] Update frontend (if needed)
- [ ] Run parallel testing
- [ ] Monitor performance
- [ ] Document API changes
- [ ] Plan maintenance window
- [ ] Execute production migration
- [ ] Verify data integrity
- [ ] Monitor post-migration

## Estimated Timeline

- **Day 1**: Database setup and schema design
- **Day 2-3**: Express backend development
- **Day 4**: Data migration scripts and testing
- **Day 5**: Frontend adjustments and integration testing
- **Day 6-7**: Deployment and monitoring

**Total**: 1 week for basic migration, 2 weeks for production-ready with full testing

## Benefits After Migration

1. **Data Integrity**: Foreign keys, constraints, transactions
2. **Performance**: Indexed queries, query optimization
3. **Scalability**: Handle hundreds of concurrent users
4. **Advanced Features**: Complex queries, aggregations, full-text search
5. **Professional Tools**: pgAdmin, backup utilities, monitoring
6. **Security**: Row-level security, encrypted connections
7. **Reliability**: ACID compliance, crash recovery

## Next Steps

1. Review and approve migration plan
2. Set up development PostgreSQL instance
3. Begin Phase 1 implementation
4. Schedule migration window
5. Prepare rollback procedures

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node-Postgres Documentation](https://node-postgres.com/)
- [TypeORM Documentation](https://typeorm.io/)