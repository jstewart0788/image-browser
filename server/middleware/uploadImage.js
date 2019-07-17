// const multer = require("multer");
var AdmZip = require("adm-zip");

const upload = (req, res) => {
  if (req.files[0].mimetype == "application/x-zip-compressed") {
    var zip = new AdmZip(req.files[0].buffer);
    var zipEntries = zip.getEntries();
    zipEntries.forEach(function(zipEntry) {
      console.log(zipEntry);
      //     multer({ dest: './uploads/',
      //     rename: function (fieldname, filename) {
      //       return filename;
      //     },
      //    }
    });
  }
};

export default upload;
