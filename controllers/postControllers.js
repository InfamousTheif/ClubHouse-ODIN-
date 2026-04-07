import * as db from "../db/queries.js";
import { query, body, validationResult, matchedData } from "express-validator";
import * as dateHandler from "../utils/dateFormatter.js";

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
      throw new Error("Email is already in use");
    };
  }),

  body("pass1").trim().notEmpty().isLength({min:1, max:20}).withMessage("Password must be between 1 to 20 characters long"),

  body("pass2").custom((value, { req }) => value === req.body.pass1)
  .withMessage("Passwords do not match")
];

const queryValidator = [
  query("status").optional().trim().notEmpty().escape().withMessage("Escape attempt failed.")
];

const postValidator = [
  body("title").trim().notEmpty().isLength({min:1, max:20}).withMessage("Title must be between 1 to 50 characters long"),

  body("text").trim().notEmpty().isLength({min:1, max:255}).withMessage("Post must be between 1 to 255 characters long")
];

async function handleSignIn(req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const errMsg = errors.array()[0].msg;
    const title = "Sign up"
    return res.render("sign-up", { title, errMsg });
  };

  const data = matchedData(req);

  // The validation above takes care of the code below in a more proper manner
  // if(data.pass1 !== data.pass2) {
  //   return res.redirect("/Sign-up?status=failedpassword")
  // };

  await db.storeUser(data);
  res.redirect("/Log-in");
};

async function handleMemberInitiation(req, res) {
  if(req.body.answer.toLowerCase() === "mortimer mouse") {
    await db.changeMemberStatus(req.user.userid);
    req.user.memberstatus = true;
    if(req.user.username === "inquntum2") {
      await db.changeAdminStatus(req.user.userid);
      req.user.adminstatus = true;
    };
    res.redirect("/");
  } else {
    res.redirect("/member-initiation?status=failed");
  };
};

async function  handleuserPosts(req, res) {
  const errors = validationResult(req);
  const posts = await db.getPosts();
  if(!errors.isEmpty()) {
    const errMsg = errors.array()[0].msg;
    const title =  "Mickey\'s Clubhouse";
    const elementClass = "flex";
    return res.render("index", {title, posts, user:req.user, elementClass, errMsg, dateHandler});
  };

  const data = matchedData(req);
  await db.storePost(data, req.user);
  res.redirect("/");
};

async function handleDeletePost(req, res) {
  const { postid } = req.body;
  await db.deletePost(postid);
  res.redirect("/");
}

export { handleSignIn, handleMemberInitiation, handleuserPosts, handleDeletePost, signUpValidator, queryValidator, postValidator }