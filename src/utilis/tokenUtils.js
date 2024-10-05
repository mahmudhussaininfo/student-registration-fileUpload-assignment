import JWT from "jsonwebtoken";

// token incode
export const tokenEncode = (email) => {
  const key = process.env.JWT_KEY;
  const expire = process.env.JWT_EXPIRE;
  const payload = { email };

  return JWT.sign(payload, key, { expiresIn: expire });
};

//token decode
export const tokenDecode = (token) => {
  try {
    const key = process.env.JWT_KEY;
    const expire = process.env.JWT_EXPIRE;
    const decode = JWT.verify(token, key);

    if (decode.email) {
      const refreshToken = JWT.sign(
        {
          email: decode.email,
        },
        key,
        {
          expiresIn: expire,
        }
      );

      return { refreshToken, email: decode.email };
    }
  } catch (error) {
    return null;
  }
};
