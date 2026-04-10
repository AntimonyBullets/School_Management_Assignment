import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
  try {
    const sqlPath = path.join(__dirname, 'schema.sql');
    let sql = fs.readFileSync(sqlPath, 'utf8');

    // Remove CREATE DATABASE and USE commands as cloud providers like Railway 
    // handle this for you with the DB_NAME in your environment.
    sql = sql.replace(/CREATE DATABASE IF NOT EXISTS.*;/gi, '');
    sql = sql.replace(/USE.*;/gi, '');

    console.log('⏳ Initializing database...');
    
    // Split by semicolon to execute commands individually if there are multiple
    const commands = sql.split(';').filter(cmd => cmd.trim() !== '');
    
    for (const command of commands) {
      await pool.execute(command);
    }

    console.log('✅ Database tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initDb();
