const express = require("express");
const cors = require("cors");
// Mis componentes
const { dbConnection } = require("../database/config");
// Inicio clase
class Server {
  constructor() {
    // variables
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";
    // conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    // cors
    this.app.use(cors());
    // lectura y parseo del body
    this.app.use(express.json());
    // Directorio publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.authPath, require("../router/auth"));
    this.app.use(this.usuarioPath, require("../router/usuarios"));
  }
  listem() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
