import * as db from '../db/queries.js';

async function handleSignIn(req, res) {
  await db.storeUser(req.body);
  res.redirect("/Log-in");
};

function handleLogIn(req, res) {

};

async function handleMemberInitiation(req, res) {
  if(req.body.answer.toLowerCase() === 'mortimer mouse') {
    await db.changeMemberStatus(req.user.userid);
    req.user.memberstatus = true;
    res.redirect("/");
  } else {
    res.redirect("/member-initiation?status=failed")
  };
};

async function  handleuserPosts(req, res) {
  db.storePost(req.body, req.user)
  res.redirect("/")
};

export { handleSignIn, handleLogIn, handleMemberInitiation, handleuserPosts }