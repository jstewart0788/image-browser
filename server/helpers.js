import fs from "fs";
import training from "./JSON/Training-Concepts.json";

export const extractTrainingConcepts = () => {
  const file = fs.readFile(training, { encoding: "utf8" });
  console.log(file);
};
