const express = require('express');
const bodyParser = require('body-parser');
const port = 8082;
const app = express();

app.use(bodyParser.json());

const airports = [
  {
    id: 0,
    name: 'Airport Minsk',
    location: "Minsk",
    planes: [],
    workers: [],
  },
  {
    id: 1,
    name: 'Domodedovo',
    location: "Moscow",
    planes: [],
    workers: [],
  },
  {
    id: 2,
    name: 'Vnukovo',
    location: "Moscow",
    planes: [],
    workers: [],
  },
];

app.get('/airports', (req, res) => {
  console.log('Returning airports list');
  res.send(airports);
});

app.post('/assignment_plane', (req, res) => {
  const { id, model, speed, passengers_amount, airport_id } = req.body;

  const currentPlane = {id, model, speed, passengers_amount};

  const foundAiport = airports.find((airport) => airport.id === airport_id);
  foundAiport.planes.push(currentPlane);

  res.status(202).header({ Location: `http://localhost:${port}/airports` }).send(currentPlane);
});

app.post('/assignment_worker', (req, res) => {
  const { id, name, surname, airport_id } = req.body;

  const currentWorker = { id, name, surname};

  const foundAiport = airports.find((airport) => airport.id === airport_id);
  foundAiport.workers.push(currentWorker);

  res.status(202).header({ Location: `http://localhost:${port}/airports` }).send(currentWorker);
});

console.log(`airport service listening on port ${port}`);
app.listen(port);
