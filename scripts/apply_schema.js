require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

(async () => {
  try {
    const schemaPath = path.resolve(__dirname, '..', 'supabase', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.error('schema.sql not found at', schemaPath);
      process.exit(1);
    }

    const sql = fs.readFileSync(schemaPath, 'utf8');

    const connectionString = process.env.DATABASE_URL || (() => {
      const host = process.env.DB_HOST;
      const user = process.env.DB_USER;
      const password = process.env.DB_PASSWORD;
      const db = process.env.DB_NAME || 'postgres';
      if (host && user && password) {
        return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:5432/${db}`;
      }
      return null;
    })();

    if (!connectionString) {
      console.error('No database connection string found. Set DATABASE_URL in your .env or provide DB_HOST/DB_USER/DB_PASSWORD/DB_NAME.');
      process.exit(1);
    }

    console.log('Connecting to database...');
    const client = new Client({ connectionString });
    await client.connect();
    console.log('Connected. Applying schema from', schemaPath);

    // Attempt to run the whole file. If Postgres driver doesn't like multiple statements,
    // fall back to splitting by ';' and executing statements sequentially.
    try {
      await client.query(sql);
      console.log('Schema applied (single query).');
    } catch (err) {
      console.warn('Single-query execution failed, trying split execution. Error:', err.message);
      const statements = sql
        .split(/;\n+/)
        .map(s => s.trim())
        .filter(Boolean);

      for (const stmt of statements) {
        try {
          await client.query(stmt);
        } catch (e) {
          console.error('Error executing statement:', e.message);
          console.error('Statement starts with:', stmt.slice(0, 200));
          throw e;
        }
      }
      console.log('Schema applied (split execution).');
    }

    await client.end();
    console.log('Done.');
  } catch (e) {
    console.error('Fatal error applying schema:', e.message || e);
    process.exit(1);
  }
})();
