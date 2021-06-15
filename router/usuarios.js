const { Router } = require("express");
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
router.post("/", usuariosPost);
// PUT
router.put("/:id", usuariosPut);
// PATCH
router.patch("/", usuariosPatch);
// DELETE
router.delete("/", usuariosDelete);

module.exports = router;
