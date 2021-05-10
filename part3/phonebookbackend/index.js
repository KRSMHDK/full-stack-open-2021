require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/persons");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("post", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens.post(req, res),
      ].join(" ");
    } else {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    }
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-12456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-43555",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "04242456",
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((phonebook) => {
    response.json(phonebook);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted" });
  }
  next(error);
};

app.use(errorHandler);

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const id = Math.random() * 99999999999999;
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "the  number or name missing",
    });
  }

  for (let k in persons) {
    console.log(persons[k].name);
    if (persons[k].name === body.name) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  date = new Date();
  response.send(
    `<div> Phonebook has info for ${persons.length} people  </div> <div>${date}<div>`
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
