const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE 341 - Project 1: Contacts API"
  },
  host: "https://cse-341-project1-cvuv.onrender.com/"
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
