require('dotenv').config();
const mysql = require('mysql2/promise');

(async ()=>{
  try {
    const connectionUrl = process.env.DATABASE_URL;
    let config;

    if (connectionUrl) {
      // parse mysql://user:pass@host:port/db
      const m = connectionUrl.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
      if (!m) throw new Error('DATABASE_URL not in mysql://user:pass@host:port/db format');
      config = {
        host: m[3],
        user: decodeURIComponent(m[1]),
        password: decodeURIComponent(m[2]),
        port: parseInt(m[4],10),
        database: m[5],
      };
    } else if (process.env.DB_HOST && process.env.DB_USER) {
      config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT,10) : 3306,
        database: process.env.DB_NAME || 'postgres',
      };
    } else {
      console.error('No DATABASE_URL or DB_HOST/DB_USER found in .env');
      process.exit(1);
    }

    console.log('Connecting to MySQL %s@%s:%s/%s', config.user, config.host, config.port, config.database);
    const conn = await mysql.createConnection({ ...config, multipleStatements: true });

    const sql = `
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pagamentos (Stripe)
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    stripe_payment_intent_id VARCHAR(255),
    amount DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'brl',
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de sessões
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) UNIQUE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

    console.log('Applying schema...');
    await conn.query(sql);
    console.log('Schema applied successfully');
    await conn.end();
  } catch (e) {
    console.error('Error applying MySQL schema:', e.message || e);
    process.exit(1);
  }
})();
