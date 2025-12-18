const jwt = require("jsonwebtoken");

const token = authorization.replace("Bearer ", "");

payload = jwt.verify(token, JWT_SECRET);
