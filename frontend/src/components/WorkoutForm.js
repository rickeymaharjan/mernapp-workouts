import { useState } from "react"
import workoutServices from "../services/data"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { Link } from "react-router-dom"

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

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
        setEmptyFields([])
        dispatch({ type: "CREATE_WORKOUT", payload: data })
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          setError(error.response.data.error || "Server error")
          setEmptyFields(error.response.data.emptyFields)
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
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(event) => setLoad(event.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(event) => setReps(event.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
