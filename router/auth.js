const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
// POST
router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El passwword es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
// POST
router.post(
  "/google-auth",
  [
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSignin
);
module.exports = router;
