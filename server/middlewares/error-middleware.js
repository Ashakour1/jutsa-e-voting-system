const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 200;

  res.status(statusCode);

  const stack = process.env.NODE_ENV === "production" ? "null" : err.stack;
  res.json({
    message: err.message,
    stack: stack,
  });
};

export default errorHandler;
