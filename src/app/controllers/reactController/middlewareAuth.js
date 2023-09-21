const jwt = require("jsonwebtoken");
const middlewareAuth = {
  verifyToken: (req, res, next) => {
    // console.log(req.body.accessToken);
    let isError = true;
    const token = req.body.accessToken;
    console.log(token)
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
        console.log(user);
        if (error) {
          console.log(error);
          isError = true;
          return res.send({ mess: "Token is not valid", isError });
        }
        req.user = user;
        next();
      });
    } else {
      isError = true;
      return res.send({ mess: "You're not authenticated", isError });
    }
  },
  verifyToKenAdminAuth: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      // console.log(req.user)
      if (req.user.authorization == 0) {
        next();
      } else {
        res.status(403).json("You're not allowed do that");
      }
    });
  },
};

module.exports = middlewareAuth;
