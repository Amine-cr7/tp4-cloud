const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, userData) => {
       if (err)
          return res.sendStatus(401).json("token invalid");
       else {
          req.user = userData;
          next();
       }
    })
}
