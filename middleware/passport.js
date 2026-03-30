import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import * as db from "../db/queries.js";
import { validPassword } from "../utils/passValidator.js";

const customFields = {
  passwordField: "pass1"
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUser(username);

    if(!user) {
      return done(null, false, {message: "Incorrect username"});
    }

    const validPass = await validPassword(password, user.password);

    if(!validPass) {
      return done(null, false, {message: "Invalid password"});
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUserByID(userId);

    done(null, user);
  } catch (err) {
    done(err);
  }
})