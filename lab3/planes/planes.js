const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 8081;
const airportHost = 8082;
const app = express();

app.use(bodyParser.json());

const planes = [];

app.get('/planes', (req, res) => {
  console.log('Returning planes list');
  res.send(planes);
});

app.post('/plane', (req, res) => {
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: `http://localhost:${airportHost}/assignment_plane`,
      body: JSON.stringify({
        id: req.body.id,
        model: req.body.model,
        speed: req.body.speed,
        passengers_amount: req.body.passengers_amount,
        airport_id: req.body.airport_id,
      }),
    },
    (err, userResponse, body) => {
      if (!err) {
        const addedPlane = {
          id: req.body.id,
          model: req.body.model,
          speed: req.body.speed,
          passengers_amount: req.body.passengers_amount,
          airport_id: req.body.airoport_id,
        };
        planes.push(addedPlane);
        res.status(202).send(addedPlane);
      } else {
        res.status(400).send({ problem: `planes Service responded with issue ${err}` });
      }
    }
  );
});

console.log(`planes service listening on port ${port}`);
app.listen(port);
