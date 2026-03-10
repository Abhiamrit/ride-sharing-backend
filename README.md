# Ride Sharing Backend API

A backend service for a ride-sharing platform built with Node.js, Express, and PostgreSQL.

## Features
- User signup and login with JWT authentication
- Ride request system
- Driver ride acceptance
- Ride completion tracking
- REST API architecture

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Render (deployment)

## Base URL
https://ride-sharing-backend-7uqq.onrender.com

## API Endpoints

POST /api/auth/signup  
POST /api/auth/login  

POST /api/rides/request  
POST /api/rides/accept/:rideId  
POST /api/rides/complete/:rideId

## Example Request
POST /api/rides/request
{
  "pickup_lat": 20.2961,
  "pickup_lng": 85.8245,
  "drop_lat": 20.3000,
  "drop_lng": 85.8200
}
