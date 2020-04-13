// check user is signed in or not
const isAuthenticated = (req, res, next) => {
  // check for user in req object
  if (req.user) {
    return next();
  }
  return res.redirect("/auth/login");
};

const isAdmin = (req, res, next) => {
  // check for user in req object
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.redirect("/");
};

module.exports = {
  isAuthenticated,
  isAdmin
};
