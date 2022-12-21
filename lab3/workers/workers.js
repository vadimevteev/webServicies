const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 8083;
const airportHost = 8082;
const app = express();

app.use(bodyParser.json());

const workers = [];

app.get('/workers', (req, res) => {
  console.log('Returning workers list');
  res.send(workers);
});

app.post('/worker', (req, res) => {
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: `http://localhost:${airportHost}/assignment_worker`,
      body: JSON.stringify({
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        airport_id: req.body.airport_id,
      }),
    },
    (err, userResponse, body) => {
      if (!err) {
        const addedWorker = {
          id: req.body.id,
          name: req.body.name,
          surname: req.body.surname,
          airport_id: req.body.airport_id,
        };
        workers.push(addedWorker);
        res.status(202).send(addedWorker);
      } else {
        res.status(400).send({ problem: `workers Service responded with issue ${err}` });
      }
    }
  );
});

console.log(`workers service listening on port ${port}`);
app.listen(port);
