const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

// Check if the repository exists
app.use('/repositories/:id', (request, response, next) => {
  const { id } = request.params;

  const getIndex = repositories.findIndex((repository) => repository.id === id);

  if (getIndex < 0) {
    return response.status(400).json({ error: 'ID not found!' });
  }

  return next();
});

const repositories = [];

// List existing repositories
app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

// Create a new repository
app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

// Update repository
app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const getIndex = repositories.findIndex((repository) => repository.id === id);

  repositories[getIndex].title = title;
  repositories[getIndex].url = url;
  repositories[getIndex].techs = techs;

  return response.json(repositories[getIndex]);
});

// Delete repository
app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  let getIndex = repositories.findIndex((repository) => repository.id === id);

  repositories.splice(getIndex, 1);

  return response.status(204).send();
});

// Give a like to the repository
app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  let getIndex = repositories.findIndex((repository) => repository.id === id);

  repositories[getIndex].likes += 1;

  return response.json(repositories[getIndex]);
});

module.exports = app;
