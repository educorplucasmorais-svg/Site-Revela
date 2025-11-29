import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

type Pool = mysql.Pool;

let pool: Pool | null = null;

function parseDatabaseUrl(url: string) {
  // mysql://user:pass@host:port/db
  const m = url.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
  if (!m) return null;
  return {
    host: m[3],
    user: decodeURIComponent(m[1]),
    password: decodeURIComponent(m[2]),
    port: parseInt(m[4], 10),
    database: m[5],
  };
}

export function getPool(): Pool {
  if (pool) return pool;

  const connectionUrl = process.env.DATABASE_URL || '';

  let config: mysql.ConnectionOptions | null = null;

  if (connectionUrl) {
    const parsed = parseDatabaseUrl(connectionUrl);
    if (parsed) {
      config = {
        host: parsed.host,
        user: parsed.user,
        password: parsed.password,
        port: parsed.port,
        database: parsed.database,
        multipleStatements: true,
      } as mysql.ConnectionOptions;
    }
  }

  if (!config) {
    // fallback to individual env vars
    config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      database: process.env.DB_NAME || undefined,
      multipleStatements: true,
    } as mysql.ConnectionOptions;
  }

  pool = mysql.createPool(config);
  return pool;
}

export async function query(sql: string, params?: any[]) {
  const p = getPool();
  const [rows] = await p.query(sql, params);
  return rows;
}
