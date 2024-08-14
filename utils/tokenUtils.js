import jwt from "jsonwebtoken";

export const CreateJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const VerifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
