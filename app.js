import express from "express";
const app = express();
import './utils/dotenv.js';
import { indexRouter } from "./routes/indexRoute.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);
import { pool } from "./db/pool.js";

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pool,
    tableName: 'userInfo'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(indexRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500 ).send(err.message || "Internal Server Error");
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, (error) => {
  if(error) {
    throw error;
  };

  console.log(`Express is listening at port ${PORT}`);
});
