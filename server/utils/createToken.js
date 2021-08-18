import jwt from "jsonwebtoken";

const day = "24h";

const createToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: day,
  });
};

export default createToken;
