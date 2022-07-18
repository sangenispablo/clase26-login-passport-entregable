const passport = require("passport");

const { Router } = require("express");

// importo el controlador para todas estas rutas
const apiController = require("../controllers/apiController");

// creo la instancia de Router
const router = Router();

// mis endpoints
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failedRegister" }),
  apiController.register
);

router.get("/failedRegister", apiController.failedRegister);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failedLogin" }),
  apiController.login
);
router.get("/failedLogin", apiController.failedLogin);

router.get("/logout", apiController.logout);

router.get("/currentSession", apiController.currentSession);

module.exports = router;
