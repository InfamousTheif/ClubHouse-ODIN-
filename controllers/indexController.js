function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';
  console.log(req.user)
  res.render('index', { title, user:req.user });
};

function renderSignUp(req, res) {
  const title = "Sign up";

  res.render('sign-up', { title });
};

function renderLogIn(req, res) {
  const title = "Log In";

  res.render('log-in', { title });
};

function renderMemberInitiation(req, res) {
  const title = "Member Initiation";

  res.render('member-initiation', { title });
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

