import './App.css';
import React, { useState, useEffect } from 'react'
import NewForm from './components/NewForm'

const App = () => {
  const [meals, setMeals] = useState('')

  //fetch index
  const getMeals = async () => {
    try {
      const allMeals = await fetch('http://localhost:9000/meals')
      console.log('All meals RAW', allMeals)
      const parsed = await allMeals.json()
      console.log('All meals parsed', parsed)
      setMeals(parsed)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    getMeals()
  }, [])

  //Fetch post
  const newMeals = async (data) => {
    try {
      const configs ={
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content Type": "application/json"
        }
      }
      const createdMeal = await fetch("http://localhost:9000/meals", configs)
      const parsed = await createdMeal.json()
      console.log("created meal parsed", parsed)
      setMeals([...meals, parsed])
    } catch (err) {
      console.log(err)
    }
  }

  //fetch for delete
  const handleDelete = async (id) => {
    try {
      const config = {
        method: "DELETE"
      }
      const deletedMeal = await fetch(`http://localhost:9000/meals/${id}`, config)
      const parsed = await deletedMeal.json()
      console.log("DELETED MEAL", parsed)
      const updatedMeals = meals.filter(meal => meal._id != parsed._id)
      setMeals(updatedMeals)
    } catch (err) {
      console.log(err)
    }
  }

  console.log({meals})
  return (
    <div>
      <h1>Meal Counter!</h1>
      <NewForm addMeal={newMeals}/>
      <table>
        <thead>
          <th>Name</th>
          <th>Meals</th>
          <th>Calorie</th>
          <th>Date</th>
        </thead>
        <tbody>
          { meals && meals.map(meal => (
            <tr key= { meal._id }>
              <td>{ meal._id }</td>
              <td>{ meal.name }</td>
              <td>{ meal.meal }</td>
              <td>{ meal.calorie }</td>
              <td>{ meal.date }</td>
              <td onClick={() => handleDelete(meal._id)}>X</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default App;
