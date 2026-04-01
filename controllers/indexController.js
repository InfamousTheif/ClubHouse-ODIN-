import * as db from "../db/queries.js";
import * as dateHandler from "../utils/dateFormatter.js";

async function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';
  const posts = await db.getPosts();
  console.log(posts)
  console.log(req.user)
  res.render('index', { title, user:req.user, posts, dateHandler });
};

function renderSignUp(req, res) {
  const title = "Sign up";
  const { status } = req.query;
  res.render('sign-up', { title, status });
};

function renderLogIn(req, res) {
  const title = "Log In";
  const { status } = req.query;

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

