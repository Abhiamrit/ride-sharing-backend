const express = require("express");
const router = express.Router();

const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");

// Test route (your original code)
router.get("/", (req, res) => {
  res.send("Ride route working");
});

// Rider requests a ride
router.post("/request", authMiddleware, rideController.requestRide);

// Driver accepts a ride
router.post("/accept/:rideId", authMiddleware, rideController.acceptRide);

// Complete a ride
router.post("/complete/:rideId", authMiddleware, rideController.completeRide);

// Get ride history
router.get("/history", authMiddleware, rideController.getRideHistory);

module.exports = router;
