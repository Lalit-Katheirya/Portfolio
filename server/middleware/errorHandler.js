export const notFound = (_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode =
    typeof res.statusCode === "number" && res.statusCode >= 400
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 ? "Internal server error" : "Request failed",
    error: err instanceof Error ? err.message : "Unknown error",
  });
};

