import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "backend", "uploads"));
  },
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9_-]/gi, "");
    const name = `${Date.now()}-${Math.floor(
      Math.random() * 1e6
    )}-${base}${ext}`;
    callback(null, name);
  },
});

const upload = multer({ storage });
export default upload;
