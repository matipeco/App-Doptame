const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../models/User");
const Role = require("../models/Roles");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." }); //

    const decoded = jwt.verify(token, config.SECRET); // si existe extraemos lo que esta dentro de config(guarda token)
    req.userId = decoded.id; //req. guardamos userId  y como valor el Id extraido del token.
    const user = await User.findById(req.userId, { password: 0 }); // no queremos la password
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });
    console.log(token);
    next();
  } catch (e) {
    return res.status(401).json({ message: "no autorizado" });
  }
};

// cuando le paso el token en headers , puede hacer los metodos http sin problema entonces comprobamos el role.
//solo deberia postear la Apa

const isApa = async (req, res, next) => {
  const user = await User.findById(req.userId); // busca el usuario ingresado
  const role = await Role.find({ _id: { $in: user.role } });
  console.log(user);
  console.log(role);
  //continuo con la siguiente funcion
  //recorro los roles
  for (let i = 0; i < role.length; i++) {
    if (role[i].name === "apa") return next(); // Si encuentra el rol "apa" pasa al siguiente middleware
  }

  return res.status(403).json({ message: "requiere rol de apa" });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId); // busca el usuario ingresado
  const role = await Role.find({ _id: { $in: user.role } });
  console.log(user);
  console.log(role);
  //continuo con la siguiente funcion
  //recorro los roles
  for (let i = 0; i < role.length; i++) {
    if (role[i].name === "admin") return next(); // Si encuentra el rol "apa" pasa al siguiente middleware
  }

  return res.status(403).json({ message: "requiere rol de admin" });
};

const isUser = async (req, res, next) => {
  const user = await User.findById(req.userId); // busca el usuario ingresado
  const role = await Role.find({ _id: { $in: user.role } });
  console.log(user);
  console.log(role);
  //continuo con la siguiente funcion
  //recorro los roles
  for (let i = 0; i < role.length; i++) {
    if (role[i].name === "user") return next(); // Si encuentra el rol "apa" pasa al siguiente middleware
  }

  return res.status(403).json({ message: "requiere rol de usuario" });
};

module.exports = { verifyToken, isApa, isAdmin, isUser };
