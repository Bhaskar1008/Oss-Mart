import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("3344ddd")
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    console.log(file.originalname)
    callback(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });
