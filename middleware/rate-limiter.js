const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redisClient");
const { ipKeyGenerator } = require("express-rate-limit");

// Rate limiter constants
const WINDOW_MINUTES = 15;
const MAX_REQUESTS = 20;
const RETRY_AFTER_SECONDS = WINDOW_MINUTES * 60;

// Custom rate limit handler
const rateLimitHandler = (req, res) => {
  res.set("Retry-After", RETRY_AFTER_SECONDS);
  res.status(429).json({
    error: true,
    message: `Rate limit exceeded. Please try again after ${WINDOW_MINUTES} minutes.`,
  });
};

// Redis store setup
const redisStore = new RedisStore({
  sendCommand: (...args) => redisClient.sendCommand(args),
});

// Main limiter instance
const rateLimiter = rateLimit({
  windowMs: RETRY_AFTER_SECONDS * 1000,
  max: MAX_REQUESTS,
  keyGenerator: ipKeyGenerator,
  handler: rateLimitHandler,
  store: redisStore,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
