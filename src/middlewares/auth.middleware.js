import createError from '../utils/create.error.util.js'
import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {

  try {
  
    const header = req.headers.authorization;
    // console.log(header)
    if (!header) {
      createError(401, "Token is missing!!!");
    }
  
    const token = header.split(" ")[1];

    // console.dir(req.headers.authorization)
  
    jwt.verify(token,process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Token is Invalid!!!");
      }
      req.user = decode;
      next();
    });
  
  } catch (error) {
    next(error);
  }
};


export const authCheckInCommu = (req, res, next) => {

  try {
  
    const header = req.headers.authorization;
    // console.log(!header)
    if (!header) {
      // console.log("debug01")
    return   next();
    }
  
    const token = header.split(" ")[1];


  
    jwt.verify(token,process.env.JWT_SECRET, (error, decode) => {
      if (error) {
       return  next();
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};