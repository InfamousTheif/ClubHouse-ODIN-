function renderIndexPage(req, res) {
  const title = 'Mickey\'s Clubhouse';

  res.render('index', { title });
};

export { renderIndexPage };