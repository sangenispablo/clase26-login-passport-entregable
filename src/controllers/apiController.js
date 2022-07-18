const { request, response } = require("express");

const register = (req, res) => {
  res.send({ status: "ok", msg: "Usuario registrado" });
};

const failedRegister = (req, res) => {
  res.status(400).send({ status: "error", msg: "Registro fallido" });
};

const login = async (req = request, res = response) => {
  try {
    res.send({ status: "ok", msg: "Usuario logeado" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const failedLogin = (req, res) => {
  res.status(400).send({ status: "error", msg: "Credenciales incorrectas" });
};

const logout = async (req = request, res = response) => {
  try {
    req.logout((error) => {
      res.send({ msg: "logout exitoso" });
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const currentSession = async (req = request, res = response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ status: "error", msg: "No existe sesión" });
    }
    res.send({ status: "ok", msg: req.user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

module.exports = {
  register,
  failedRegister,
  login,
  failedLogin,
  currentSession,
  logout,
};
