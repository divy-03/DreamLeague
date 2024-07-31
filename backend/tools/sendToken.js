const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const data = {
    user: {
      email: user.email,
      id: user.id,
    },
  };

  const authToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
  });

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "none" as const,
  };

  res.cookie("dToken", authToken, options);

  return res.status(statusCode).json({
    success: true,
    authToken,
    user,
  });
};

module.exports = sendToken;
