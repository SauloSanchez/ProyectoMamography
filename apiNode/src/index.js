const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const TeachableMachine = require("@sashido/teachablemachine-node");

// almacenamiento de la imagen con multer
// Escogemos el directorio donde se almacenará la imagen y el nombre que tendrá la imagen
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Preparamos el modelo
const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/55oQFB8hv/",
});

// Inicializar express
const app = express();

// Inicializamos el cors
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, "public")));

// Configuramos multer
// const upload = multer({ dest: "./uploads" });
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/uploads"),
  }).single("image")
);

app.post("/api/classify", async (req, res) => {
  console.log(req.file);

  const image = req.file;
  console.log(image);
  model
    .classify({
      imageUrl: "http://localhost:3000/uploads/" + image.filename,
    })
    .then((predictions) => {
      console.log("Predictions:", predictions);
      // res.json(predictions);
      return res.status(200).json({
        predictions,
      });
    })
    .catch((e) => {
      console.log("ERROR", e);
      // res.json(e);
      return res.status(500).json({
        e,
      });
    });
  // res.send("hello world api");
});

app.listen(3000, () => {
  console.log(`Hola soy el servidor en el puerto 3000`);
});
