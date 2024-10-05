import { tokenDecode } from "../utilis/tokenUtils.js";

export default (req, res, next) => {
  const token = req.cookies.Token;

  const decoded = tokenDecode(token);

  // token is not
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // set cookie for refesh token
  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.cookie("Token", decoded.refreshToken, options);

  // set email to request headers
  let email = decoded.email;
  req.headers.email = email;
  next();
};
