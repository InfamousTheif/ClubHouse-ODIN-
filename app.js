import express from "express";
const app = express();
import './utils/dotenv.js';
import { indexRouter } from "./routes/indexRoute.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);
import { pool } from "./db/pool.js";
import passport from "passport";

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
    tableName: 'session',
    createTableIfMissing: true
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Passport js 
import './middleware/passport.js'
app.use(passport.initialize());
app.use(passport.session());

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
