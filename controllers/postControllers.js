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

export { handleSignIn, handleLogIn, handleMemberInitiation, handleuserPosts, handleDeletePost }