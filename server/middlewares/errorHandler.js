const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).json({
      message: "Not a valid Event",
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

const notFound = (req, res, next) => {
  const error = new Error("Address not found");
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
