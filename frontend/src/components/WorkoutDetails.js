import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import workoutServices from "../services/data"

import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { useAnimate, usePresence } from "framer-motion"
import { useEffect } from "react"

const WorkoutDetails = ({ workout, index }) => {
  const { dispatch } = useWorkoutsContext()
  const [scope, animate] = useAnimate()
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (isPresent) {
      animate(
        scope.current,
        { opacity: [0, 1] },
        { duration: 0.4, delay: 0.2 * index }
      )
    }
  }, [])

  const handleClick = () => {
    animate(scope.current, { opacity: [1, 0] }, { duration: 0.2 })
    workoutServices.remove(workout.id).then((data) => {
      console.log("Workout removed", data)
      dispatch({ type: "DELETE_WORKOUT", payload: data })
    })
  }

  return (
    <div ref={scope} className="workout-details">
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
