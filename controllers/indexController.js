function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';

  res.render('index', { title });
};

function renderSignIn(req, res) {
  const title = "Sign In";

  res.render('sign-in', { title });
};

export { renderIndexPage, renderSignIn };

