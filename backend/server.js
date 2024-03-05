require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.get("/", (req, res) => {
  return res.json({ hello: "world" })
})

// Routes
app.use("/api/workouts", workoutRoutes)

// connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to the database.")
      console.log(`Listening on port http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("Error connecting to the database", error)
  })
