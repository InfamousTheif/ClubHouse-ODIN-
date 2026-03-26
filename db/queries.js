import { pool } from "./pool.js";
import bcrypt from "bcryptjs";

async function getUsers(params) {
  const { rows } = await pool.query('SELECT * FROM userInfo');
  return rows;
};

async function getPosts(params) {
  const { rows } = await pool.query('SELECT * FROM userPost');
  return rows;
};

async function storeUser(userInfo) {
  try {
    const { username, email, pass1 } = userInfo;
    const hPass1 = await bcrypt.hash(pass1, 10); //something something encryption(details later)
    await pool.query('INSERT INTO userInfo (username, password, email) VALUES ($1, $2, $3)', [username, hPass1, email]);
  } catch (err) {
    console.error(err);
  };
};

async function storePost(userPost, userInfo) {
  try {
    const {userId, username } = userInfo;
    const { title, text } = userPost;
    await pool.query('INSERT INTO userPost (userId, username, title, post) VALUES ($1, $2, $3, $4)', [userId, username, title, text ]);
  } catch (err) {
    console.error(err);
  };
};