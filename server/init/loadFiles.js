//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join("/home/gehrman/Downloads", "training-set");
//passsing directoryPath and callback function

const fileNames = [];

const fileNamesRaw = fs.readdirSync(directoryPath);

fileNamesRaw.forEach(function(file) {
  // Do whatever you want to do with the file
  fileNames.push(file.split(".")[0]);
});

module.exports = fileNames;
