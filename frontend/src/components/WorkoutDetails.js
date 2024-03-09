import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import workoutServices from "../services/data"

import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = () => {
    workoutServices.remove(workout.id).then((data) => {
      console.log("Workout removed", data)
      dispatch({ type: "DELETE_WORKOUT", payload: data })
    })
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails
