// Import Dependencies
const rateLimit = require("express-rate-limit");

function limiter(min = 60, max = 3000) {
  return rateLimit({
    max: max,
    windowMs: min * 60 * 1000,
    message: {
      message: `Too many requists sent by this ip, please try again ${min} munite later`,
    },
  });
}

module.exports = limiter;
