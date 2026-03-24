import { Client } from "pg";
import '../utils/dotenv.js';

const SQL = `
  CREATE TABLE IF NOT EXISTS userInfo (
    userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(10) NOT NULL CHECK(LENGTH(TRIM(username)) > 0),
    password VARCHAR(15) NOT NULL CHECK(LENGTH(TRIM(password)) > 0),
    email VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(password)) > 0),
    memberStatus BOOLEAN NOT NULL DEFAULT FALSE
  );
    
  INSERT INTO UserInfo (username, password, email)
   VALUES ('gamer123', 'hello123', 'gamer123@gmail.com');

  CREATE TABLE IF NOT EXISTS userPost (
    userId INTEGER PRIMARY KEY,
    username VARCHAR(10) NOT NULL CHECK(LENGTH(TRIM(username)) > 0),
    post VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(post)) > 0),
    sendDate TIMESTAMPTZ DEFAULT now()
  );
    
  INSERT INTO userPost (userId, username, post)
   VALUES (1, 'gamer123', 'I love playing games. The one I play the most currently is 2XKO; go check it out.');   
`;

async function populateDB() {
  console.log('seeding...');

  const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Done');
  } catch(err) {
    console.log(`Seeding error: ${err}`);
  } finally {
    await client.end();
  };
};

populateDB();