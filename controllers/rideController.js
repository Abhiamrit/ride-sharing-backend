const pool = require("../config/db");

// Rider requests a ride
exports.requestRide = async (req, res) => {
  try {
    const { pickup_lat, pickup_lng, drop_lat, drop_lng } = req.body;

    const result = await pool.query(
      `INSERT INTO rides (rider_id, pickup_lat, pickup_lng, drop_lat, drop_lng)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [req.user.id, pickup_lat, pickup_lng, drop_lat, drop_lng],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ride request failed" });
  }
};

// Driver accepts ride
exports.acceptRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const result = await pool.query(
      `UPDATE rides
       SET driver_id=$1, status='accepted'
       WHERE id=$2
       RETURNING *`,
      [req.user.id, rideId],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Accept ride failed" });
  }
};

// Complete ride
exports.completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    await pool.query(
      `UPDATE rides
       SET status='completed'
       WHERE id=$1`,
      [rideId],
    );

    res.json({ message: "Ride completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Complete ride failed" });
  }
};

// Ride history
exports.getRideHistory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM rides
       WHERE rider_id=$1 OR driver_id=$1`,
      [req.user.id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get ride history" });
  }
};
