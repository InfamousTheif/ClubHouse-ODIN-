function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';

  res.render('index', { title });
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

export { renderIndexPage, renderSignUp, renderLogIn, renderMemberInitiation };

