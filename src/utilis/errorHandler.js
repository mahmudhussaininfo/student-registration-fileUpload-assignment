import fs from "fs";

//create error
export const createError = (msg, status = 500) => {
  const err = new Error(msg);
  err.status = status;
  return err;
};

//not found error middleware
export const notFoundError = (req, res, next) => {
  const error = createError(`not found`, 404);
  next(error);
};

//default error handler
export const defaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "server error";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message, stack: err.stack });

  //create error log file
  const logFile = fs.createWriteStream("error.log", {
    flags: "a", // if set "w" error will be overwritten
  });

  const logMsg = err.toString() + new Date() + "\n";

  logFile.write(logMsg);
};