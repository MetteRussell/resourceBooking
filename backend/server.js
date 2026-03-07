const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

// Create server
const server = jsonServer.create();

// Set up middleware
const middlewares = jsonServer.defaults({
  logger: true,
  readOnly: false,
  noCors: false
});

// Configure CORS for production
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(middlewares);

// Database path from environment or default
const DB_PATH = process.env.DB_PATH || '/data/db.json';
const PORT = process.env.PORT || 3005;

// Initialize database
function initializeDatabase() {
  // Check if database exists
  if (!fs.existsSync(DB_PATH)) {
    console.log('Database not found, creating from template...');
    
    // Create directory if it doesn't exist
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Copy template database
    const templatePath = '/tmp/db.json';
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, DB_PATH);
      console.log('Database initialized from template');
    } else {
      // Create minimal database if no template
      const minimalDb = {
        users: [],
        materials: [],
        reservedDates: [],
        allMaterials: []
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(minimalDb, null, 2));
      console.log('Database initialized with minimal structure');
    }
  } else {
    console.log(`Using existing database at ${DB_PATH}`);
  }
}

// Initialize database
initializeDatabase();

// Create router with the database file
const router = jsonServer.router(DB_PATH);

// Add custom routes if needed
server.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Use router
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`
  🚀 JSON Server is running
  
  Resources:
  http://localhost:${PORT}/users
  http://localhost:${PORT}/materials
  http://localhost:${PORT}/reservedDates
  http://localhost:${PORT}/allMaterials
  
  Health check:
  http://localhost:${PORT}/health
  
  Database location: ${DB_PATH}
  `);
});