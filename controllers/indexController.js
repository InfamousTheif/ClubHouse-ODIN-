import * as db from "../db/queries.js";
import * as dateHandler from "../utils/dateFormatter.js";
import { validationResult, matchedData } from "express-validator";

async function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';
  const posts = await db.getPosts();
  console.log(posts)
  console.log(req.user)
  res.render('index', { title, user:req.user, posts, dateHandler });
};

function renderSignUp(req, res) {
  const title = "Sign up";
  res.render('sign-up', { title});
};

function renderLogIn(req, res) {
  const title = "Log In";
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const errCode = 500;
    const errMsg = errors.array()[0].msg;
    return res.render("displayErr", { title, errCode, errMsg });
  }

  const data = matchedData(req);
  const { status } = data

  res.render('log-in', { title, status });
};

function renderMemberInitiation(req, res) {
  const title = "Member Initiation";
  const { status } = req.query

  res.render('member-initiation', { title, status });
};

function handleLogOut(req, res) {
  req.logout((err) => {
    if(err) {
      return next(err);
    };
  });
  res.redirect("/")
}

export { renderIndexPage, renderSignUp, renderLogIn, renderMemberInitiation, handleLogOut };

