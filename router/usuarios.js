const { Router } = require("express");
const { check } = require("express-validator");

const {
  isRolValid,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();
// GET
router.get("/", usuariosGet);
// POST
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe tener minimo 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("correo", "El corroe no es valido").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom((rol) => isRolValid(rol)),
    validarCampos,
  ],
  usuariosPost
);
// PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID valido.").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom((rol) => isRolValid(rol)),
    validarCampos,
  ],
  usuariosPut
);
// DELETE
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido.").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);
// PATCH
router.patch("/", usuariosPatch);

module.exports = router;
