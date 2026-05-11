const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'portfolio_db'
    });

    const hash = '$2b$10$j6evtDYkfKYoLcZ6LC/1E.ydDHrhyBebplC2bARQPbE12ntZJUkIG';
    await connection.execute('UPDATE users SET password = ? WHERE username = ?', [hash, 'admin']);
    console.log('Admin password updated successfully');
    await connection.end();
}

run().catch(console.error);
