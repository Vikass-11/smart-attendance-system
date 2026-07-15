import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const runMigrations = async () => {
  console.log('Connecting to database...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    multipleStatements: true // Required to run multiple queries from a file
  });

  try {
    const schemaPath = path.resolve(__dirname, '../docs/schema.sql');
    console.log(`Reading SQL file from ${schemaPath}...`);
    let sql = fs.readFileSync(schemaPath, 'utf8');

    // Remove the database creation and USE statements since Railway handles the DB
    sql = sql.replace(/CREATE DATABASE IF NOT EXISTS attendance_system;/g, '');
    sql = sql.replace(/USE attendance_system;/g, '');

    console.log('Executing SQL migrations...');
    await connection.query(sql);
    console.log('Successfully created all tables!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await connection.end();
  }
};

runMigrations();
