import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

function MealDetail (props){
  const currentId = props.match.params.id
  const [meal, setMeal] = useState({})
  const [loading, setLoading] = useState(true)
  const getMeal = async (id) => {
    const url = 'http://localhost:9000/meals/'+id
    const foundMeal = await fetch(url)
    const parsedMeal = await foundMeal.json()
    setMeal(parsedMeal)
    setLoading(false)
  }
  useEffect(()=>{
    getMeal(currentId)
  }, [])
  const addLikes = () => {
    console.log("Increasing likes")

  }
  return(
    <>
    { loading ? (<h3><em>Loading...</em></h3>) : (
      <div>
        <h1>{meal.name}</h1>
        <p>{meal.meal}</p>
        <p>{meal.calories}</p>
        <p>{meal.date}</p>
        <Link to={'/meals'}>Back</Link>
        <Link to={`/meals/${meal._id}/edit`}>Edit</Link>
      </div>
    )}
    </>
  )
}

export default MealDetail
