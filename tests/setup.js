import mysql from 'mysql2/promise';

async function checkDBConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3307,
      user: 'root',
      password: '123456',
      database: 'university'
    });
    
    await connection.execute('SELECT 1');
    await connection.end();
    console.log('Test database is accessible on localhost:3307');
    return true;
  } catch (error) {
    console.log('Cannot connect to test database on localhost:3307');
    console.log('try ty to run: docker-compose up -d');
    return false;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkDBConnection();
}

export { checkDBConnection };