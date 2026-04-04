import * as db from '../db/queries.js';
import { query, body, validationResult, matchedData } from 'express-validator';

// Validations
const signUpValidator = [
  body("username").trim().notEmpty().isLength({min:1, max:20}).withMessage("Username must be between 1 to 20 characters long").custom( async value => {
    const user = await db.getUser(value);
    if(user) {
      throw new Error("This username is taken");
    };
  }),

  body("email").trim().notEmpty().isEmail().withMessage("Invalid email").custom( async (value) => {
    const user = await db.getUserByEmail(value);
    if(user) {
      throw new Error("Email is already in use")
    };
  }),

  body("pass1").trim().notEmpty().isLength({min:1, max:20}).withMessage("Password must be between 1 to 20 characters long"),

  body("pass2").custom((value, { req }) => value === req.body.pass1)
  .withMessage("Passwords do not match")
];

const queryValidator = [
  query("status").optional().trim().notEmpty().escape().withMessage("Escape attempt failed.")
];

async function handleSignIn(req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const errMsg = errors.array()[0].msg;
    const title = "Sign up"
    return res.render("sign-up", { title, errMsg });
  }

  const data = matchedData(req)

  // The validation above takes care of the code below in a more proper manner
  // if(data.pass1 !== data.pass2) {
  //   return res.redirect("/Sign-up?status=failedpassword")
  // };

  console.log(data)

  await db.storeUser(data);
  res.redirect("/Log-in");
};

function handleLogIn(req, res) {

};

async function handleMemberInitiation(req, res) {
  if(req.body.answer.toLowerCase() === 'mortimer mouse') {
    await db.changeMemberStatus(req.user.userid);
    req.user.memberstatus = true;
    if(req.user.username === "inquntum2") {
      await db.changeAdminStatus(req.user.userid);
      req.user.adminstatus = true;
    };
    res.redirect("/");
  } else {
    res.redirect("/member-initiation?status=failed")
  };
};

async function  handleuserPosts(req, res) {
  await db.storePost(req.body, req.user)
  res.redirect("/")
};

async function handleDeletePost(req, res) {
  const { postid } = req.body;
  await db.deletePost(postid);
  res.redirect("/")
}

export { handleSignIn, handleLogIn, handleMemberInitiation, handleuserPosts, handleDeletePost, signUpValidator, queryValidator }