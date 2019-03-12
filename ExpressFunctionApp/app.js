const express = require("express");
const jsonfile = require("jsonfile");
const path = require("path");
const app = express();

app.get('/api/docs/:requestPath', (req, res) => {
  let requestPath = req.params.requestPath;
  let file = path.join(__dirname + '/docs/' + requestPath);

  jsonfile.readFile(file, (err, obj) => {
    if(err) {
      res.status(404);
    }
    res.json(obj);
  });
});

app.post('/api/path-encoding/:text', (req, res) => {
  let response = {};

  response["inputs"] = {};
  response["inputs"]["originalUrl"] = req.originalUrl;
  response["inputs"]["headers"] = req.headers;
  response["inputs"]["body"] = req.body;

  response["path"] = req.originalUrl.replace(/.*\/api\/path-encoding\//g, '');
  res.json(response);
});

app.post('/api/query-encoding', (req, res) => {
  let response = {};

  response["inputs"] = {};
  response["inputs"]["originalUrl"] = req.originalUrl;
  response["inputs"]["headers"] = req.headers;
  response["inputs"]["body"] = req.body;

  response["query"] = req.originalUrl.replace(/.*\/api\/query-encoding\?string_query=/g, '');
  res.json(response);
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    let response = {};
    response['error'] = err;
    res.status(400).json(response);
  } else {
    next();
  }
});

module.exports = app;
