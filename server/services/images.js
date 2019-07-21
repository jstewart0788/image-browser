const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const util = require("util");
const Tag = require("./tag");
const Image = require("../models/imagesv2");
const rimraf = require("rimraf");

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

module.exports = class ImageService {
  constructor() {
    this.tag = new Tag();
  }

  fetchAll(page, filter) {
    const queryFilter = filter ? { codes: filter } : null;
    return Image.find(queryFilter, null, {
      sort: "-createdOn",
      limit: 20,
      skip: 20 * (page - 1)
    }).exec();
  }

  fetchOne(name) {
    return Image.findOne({ name }).exec();
  }

  updateOne(image) {
    return Image.updateOne({ _id: image["_id"] }, { tags: image.tags }).exec();
  }

  Count(filter) {
    const queryFilter = filter ? { tags: filter } : {};
    return Image.count(queryFilter);
  }

  uploadMany(
    {
      files,
      userName,
      body: { desc }
    },
    res
  ) {
    const imageField = files.filter(file => file.fieldname === "images")[0];
    const metaField = files.filter(file => file.fieldname === "meta")[0];

    const imageFiles = fs.readFileSync(imageField.path);

    let metaData = {};

    const metaReader = require("readline").createInterface({
      input: fs.createReadStream(metaField.path, "utf8")
    });

    metaReader
      .on("line", line => {
        let lineSplit = line.split("\t");
        let image = lineSplit[0];
        let tags = lineSplit[1].split(";");
        metaData[image] = tags;
      })
      .on("close", () => {
        const zip = new AdmZip(imageFiles);
        zip.extractAllTo("uploads");
        const imagesPath = path.join("uploads/images");

        const fileNamesRaw = fs.readdirSync(imagesPath);
        const images = [];

        Promise.all(
          fileNamesRaw.map(async file => {
            const fileData = await readFile(path.join(imagesPath, file));
            const name = file.split(".")[0];
            const fileType = file.split(".")[1];
            const codes = metaData[name];
            images.push({
              name,
              img: {
                data: fileData,
                contentType: `image/${fileType}`
              },
              description: desc,
              codes,
              postedBy: userName
            });
          })
        )
          .then(() => {
            Image.insertMany(images, (err, doc) => {
              if (err) {
                res.status(500).json({ msg: "Problem inserting images!" });
                rimraf("uploads", () => console.log("Deleted uploads directory"));
              } else {
                res.json({ msg: "Sucessfully inserted images!" });
                rimraf("uploads", () => console.log("Deleted uploads directory"));
              }
            });
          })
          .catch(() => {
            res.status(500).json({ msg: "Problem reading images!" });
            rimraf("uploads", () => console.log("Deleted uploads directory"));
          });
      })
      .on("error", () => {
        res.status(500).json({ msg: "Problem reading meta File" });
        rimraf("uploads", () => console.log("Deleted uploads directory"));
      });
  }
};
