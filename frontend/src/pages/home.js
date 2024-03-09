import { useEffect } from "react"
import workoutServices from "../services/data"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    workoutServices.getAll().then((initialWorkouts) => {
      dispatch({ type: "SET_WORKOUTS", payload: initialWorkouts })
    })
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout.id} workout={workout} />
          ))}
      </div>
      <div>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home
