const rateLimit = require("express-rate-limit");

// For login route
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per window
  message: { message: "Too many login attempts, try again after 15 minutes" },
  standardHeaders: true, // return rate limit info in RateLimit-* headers
  legacyHeaders: false,
});

module.exports = { loginLimiter }