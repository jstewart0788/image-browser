const path = require("path");
const fs = require("fs");
const validationReader = require("readline").createInterface({
  input: fs.createReadStream(
    path.resolve("./", "public", "Validation-Concepts.txt"),
    "utf8"
  )
});
const trainingReader = require("readline").createInterface({
  input: fs.createReadStream(
    path.resolve("./", "public", "Training-Concepts.txt"),
    "utf8"
  )
});
const dictionaryReader = require("readline").createInterface({
  input: fs.createReadStream(
    path.resolve("./", "public", "dictionary.csv"),
    "utf8"
  )
});

let validationData = {};
let trainingData = {};
let dictionaryData = {};

trainingReader
  .on("line", function(line) {
    let lineSplit = line.split("\t");
    let image = lineSplit[0];
    let tags = lineSplit[1].split(";");
    trainingData[image] = tags;
  })
  .on("close", function() {
    fs.writeFile(
      path.resolve("./", "public", "Training-Concepts.json"),
      JSON.stringify(trainingData),
      err => {
        if (err) console.log(err);
        console.log("File saved!");
      }
    );
  });

validationReader
  .on("line", function(line) {
    let lineSplit = line.split("\t");
    let image = lineSplit[0];
    let tags = lineSplit[1].split(";");
    validationData[image] = tags;
  })
  .on("close", function() {
    fs.writeFile(
      path.resolve("./", "public", "Validation-Concepts.json"),
      JSON.stringify(validationData),
      err => {
        if (err) console.log(err);
        console.log("File saved!");
      }
    );
  });

dictionaryReader
  .on("line", function(line) {
    let lineSplit = line.split("\"")[1].split("\t");
    let code = lineSplit[0];
    let desc = lineSplit[1];
    dictionaryData[code] = desc;
  })
  .on("close", function() {
    fs.writeFile(
      path.resolve("./", "public", "dictionary.json"),
      JSON.stringify(dictionaryData),
      err => {
        if (err) console.log(err);
        console.log("File saved!");
      }
    );
  });
