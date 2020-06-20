const express = require("express");

const router = express.Router();

const { uuid } = require("uuidv4");

const repositories = [];
const likes = [];

router.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

router.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.json(newRepository);
});

router.put("/repositories/:id", (request, response) => {
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

router.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const likeIndex = likes.findIndex(like => likes.idRepository === id);

  if (repositoryIndex < 0) return response.status(400).json({ error: "Not found!" });

  repositories.splice(repositoryIndex, 1);
  likes.splice(likeIndex, 1);

  return response.status(204).send();
});

router.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) return response.status(400).json({ error: "Not found!" });

  repositories[repositoryIndex].likes++;

  return response.json({ likes: repositories[repositoryIndex].likes });
});

module.exports = router;