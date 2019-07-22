const Message = require("../models/message");

module.exports = class MessageServcie {
  getMessagesForImage(imageId) {
    console.log(imageId)
    return Message.find({ imageId }).exec();
  }

  insert(req, res) {
    const {
      body: { content, id },
      user: { userName }
    } = req;
    Message.create(
      { content, imageId: id, postedBy: userName },
      (err, data) => {
        if (err) res.status(500).json({ msg: "Failed to create message" });
        else res.json(data);
      }
    );
  }
};
