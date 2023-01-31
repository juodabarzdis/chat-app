export const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.status(401).send("Your session has expired. Please log in again.");
  }
};
