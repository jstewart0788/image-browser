const Message = require("../services/message");

module.exports = class Images {
  static init(baseRoute, app) {
    const message = new Message();

    app.get(`${baseRoute}/message`, async (req, res, next) => {
      const { id } = req.query;
      console.log(req.query)
      message
        .getMessagesForImage(id)
        .then(messages => {
          res.json(messages);
        })
        .catch(next);
    });

    app.post(`${baseRoute}/message`, async (req, res) => {
      message.insert(req, res);
    });
  }
};
