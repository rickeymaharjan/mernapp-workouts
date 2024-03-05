import { useState } from "react"
import workoutServices from "../services/data"

const WorkoutForm = () => {
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const workout = { title, reps, load }

    workoutServices
      .create(workout)
      .then((data) => {
        console.log(`New workout added`, data)
        setTitle("")
        setReps("")
        setLoad("")
        setError(null)
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || "Server error")
        } else {
          setError("Network error: Unable to reach the server")
        }
      })
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(event) => setLoad(event.target.value)}
        value={load}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(event) => setReps(event.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
