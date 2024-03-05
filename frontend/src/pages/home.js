import { useEffect, useState } from "react"
import workoutServices from "../services/data"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    workoutServices.getAll().then((initialWorkouts) => {
      setWorkouts(initialWorkouts)
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
