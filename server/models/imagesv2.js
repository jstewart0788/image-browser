const fs = require("fs");
const AdmZip = require("adm-zip");
const Tag = require("./tag");

module.exports = class Image {
  constructor(mongoose) {
    this.tag = new Tag(mongoose);
    this.schema = mongoose.Schema({
      name: { type: String, required: true },
      img: { data: Buffer, contentType: String },
      description: String,
      tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", index: true }],
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    });

    this.model = mongoose.model("Imagev2", this.schema);
  }

  fetchAll(page, filter) {
    const queryFilter = filter ? { tags: filter } : null;
    return this.model
      .find(queryFilter, null, {
        sort: "-createdOn",
        limit: 20,
        skip: 20 * (page - 1)
      })
      .exec();
  }

  fetchOne(name) {
    return this.model.findOne({ name }).exec();
  }

  updateOne(image) {
    return this.model
      .updateOne({ _id: image["_id"] }, { tags: image.tags })
      .exec();
  }

  Count(filter) {
    const queryFilter = filter ? { tags: filter } : {};
    return this.model.count(queryFilter);
  }

  async uploadMany(files, id, res) {
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
        const zipEntries = zip.getEntries();
        const Images = zipEntries
          .filter(image => image.name.split(".")[0])
          .map(image => {
            const name = image.name.split(".")[0];
            const tags = this.tag.getIdsByCode(metaData[name]);
            return {
              name,
              img: image.getCompressedData(),
              description: "",
              tags,
              postedBy: id
            };
          });

        this.model.insertMany(Images, (err, doc) => {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "Problem inserting images!" });
          }
          console.log(doc);
          res.json({ msg: "Sucessfully inserted images!" });
        });
      })
      .on("error", () => {
        res.status(500).json({ msg: "Problem reading meta File" });
      });
  }
};
