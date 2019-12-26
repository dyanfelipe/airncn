const multer = require("multer");
const path = require("path"); // colocar a barra certa

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    // como o arquivo vai ser formado. cb e callback
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext); // retorna o nome da imagem sem extensão
      cb(null, `${name}-${Date.now()}${path.extname(ext)}`);
    }
  })
};
