import rateLimit from "express-rate-limit";

// Define the "Locked Door" rules
const adminActionsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: {
    success: false,
    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Show remaining attempts in response headers
  legacyHeaders: false,
});

export default adminActionsLimiter;
