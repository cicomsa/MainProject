const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/planner', (req, res) => {
      return app.render(req, res, '/planner')
    })

    server.get('/planner/:handle', (req, res) => {
      return app.render(req, res, '/planner', { handle: req.params.handle })
    })

    server.get('/planner/:handle/:category', (req, res) => {
      return app.render(req, res, '/planner', { handle: req.params.handle, category: req.params.category })
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Ready on http://localhost:${port}`);
    })
  });