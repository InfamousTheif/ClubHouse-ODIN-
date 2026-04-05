import { Client } from "pg";
import "../utils/dotenv.js";

const SQL = `
  CREATE TABLE IF NOT EXISTS userInfo (
    userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20) NOT NULL CHECK(LENGTH(TRIM(username)) > 0),
    password VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(password)) > 0),
    email VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(password)) > 0),
    memberStatus BOOLEAN NOT NULL DEFAULT FALSE,
    adminStatus BOOLEAN NOT NULL DEFAULT FALSE
  );
    

  CREATE TABLE IF NOT EXISTS userPost (
    postId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INTEGER,
    username VARCHAR(20) NOT NULL CHECK(LENGTH(TRIM(username)) > 0),
    title VARCHAR(50) NOT NULL CHECK(LENGTH(TRIM(username)) > 0),
    post VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(post)) > 0),
    sendDate TIMESTAMPTZ DEFAULT now()
  );
     
`;

async function populateDB() {
  console.log("seeding...");

  if(!process.argv[2]) {
    throw new Error("Missing database connection string");
  };

  const client = new Client({
  connectionString: process.argv[2]
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done");
  } catch(err) {
    console.log(`Seeding error: ${err}`);
  } finally {
    await client.end();
  };
};

populateDB();