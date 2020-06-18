const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: []
  };

  const like = {
    idRepository: newRepository.id,
    like: 0
  }

  repositories.push(newRepository);
  likes.push(like);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) return response.status(400).json({ error: "Not found!" });

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const likeIndex = like.findIndex(like => likes.idRepository === id);

  if (repositoryIndex < 0) return response.status(400).json({ error: "Not found!" });

  repositories.splice(repositoryIndex, 1);
  like.splice(likeIndex, 1);

  return response.status(204).send();
});

app.patch("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  repositories[repositoryIndex].likes = likes.map((like) => {
    like.idRepository === id ? ++like.like : like.like;
    return like;
  });

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
