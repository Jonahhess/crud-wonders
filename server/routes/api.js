const express = require("express");
const router = express.Router();

const wonders = [
  { name: "Mount Everest", location: "Nepal", visited: false },
  { name: "Grand Canyon", location: "Arizona", visited: false },
  { name: "Botanical Gardens", location: "Singapore", visited: true },
  { name: "Pantheon", location: "Greece", visited: false },
  { name: "Colosseum", location: "Italy", visited: true },
];

router.get("/wonders", function (req, res) {
  res.send(wonders);
});

router.post("/wonder", (req, res) => {
  const wonder = req.body.wonder;
  const location = req.body.location;
  wonders.push({ name: wonder, location, visited: false });
  res.send("Test");
});

router.put("/wonder/:name", (req, res) => {
  const name = req.params.name;
  if (!name) {
    res.status(400).send("an error occurred");
  }

  const wonder = wonders.find((wonder) => wonder.name === name);
  if (!wonder) {
    res.status(400).send("an error occurred");
  }

  wonder.visited = true;
  res.end();
});

router.delete("/wonder/:name", (req, res) => {
  const name = req.params.name;
  const indexToDelete = wonders.findIndex((wonder) => wonder.name === name);
  if (indexToDelete <= -1) {
    res.status(400).send("an error occurred");
  }
  wonders.splice(indexToDelete, 1);
  res.end();
});
module.exports = router;
