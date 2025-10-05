var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;

  return jwt({
    secret,
    algorithms: ["HS256"],
    requestProperty: "auth"
  }).unless({
    path: [
      // Cho phép không cần token
      { url: /\/api\/user\/signin/, methods: ["POST"] },
      { url: /\/api\/user\/signup/, methods: ["POST"] },
      { url: /\/api\/products(.*)/, methods: ["GET"] },
      { url: /\/api\/category(.*)/, methods: ["GET"] },
      { url: /\/uploads(.*)/, methods: ["GET"] },
    ]
  });
}

module.exports = authJwt;
