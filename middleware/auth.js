import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, "test");
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }

      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log("error -->>", error);
  }
};

export default auth;
