require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

(async ()=>{
  try {
    const connectionUrl = process.env.DATABASE_URL;
    let config;

    if (connectionUrl) {
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
        database: process.env.DB_NAME,
      };
    } else {
      console.error('No DATABASE_URL or DB_HOST/DB_USER found in .env');
      process.exit(1);
    }

    console.log('Connecting to MySQL %s@%s:%s/%s', config.user, config.host, config.port, config.database);
    const conn = await mysql.createConnection({ ...config, multipleStatements: true });

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@revela.local';
    const adminName = process.env.SEED_ADMIN_NAME || 'admin';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';

    const [rows] = await conn.query('SELECT id FROM users WHERE email = ? OR name = ? LIMIT 1', [adminEmail, adminName]);
    if (Array.isArray(rows) && rows.length > 0) {
      console.log('Admin user already exists, skipping.');
      await conn.end();
      return;
    }

    const hash = await bcrypt.hash(adminPassword, 10);
    await conn.query('INSERT INTO users (email, name, password_hash, created_at) VALUES (?, ?, ?, NOW())', [adminEmail, adminName, hash]);
    console.log('Admin user created:', adminEmail);
    await conn.end();
  } catch (e) {
    console.error('Error seeding admin:', e.message || e);
    process.exit(1);
  }
})();
