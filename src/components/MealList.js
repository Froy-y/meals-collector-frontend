import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Backspace } from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';


const MealList = (props) => {
    const [meals, setMeals] = useState([])

    // fetch for index
    const getMeals = async () => {
        try {
            const allMeals = await fetch('http://localhost:9000/meals')
            const parsed = await allMeals.json()
            setMeals(parsed)
        } catch (err) {
            console.log(err)
        }
    }

    // fetch for delete
    const handleDelete = async (id) => {
        try {
            const config = {
                method: "DELETE"
            }
            const deletedMeal = await fetch(`http://localhost:9000/meals/${id}`, config)
            const parsed = await deletedMeal.json()
            const updatedMeal = meals.filter(meal => meal._id !== parsed._id)
            setMeals(updatedMeal)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMeals()
    }, []);

    return(
        <div className="table">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Meals</th>
                        <th>Calories</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    { meals && meals.map (meal => (
                        <tr key={ meal._id }>
                            <Link to={ `/meals/${meal._id}` }><td>{ meal.name }</td></Link>
                            <td>{ meal.meal }</td>
                            <td>{ meal.calories }</td>
                            <td>{ meal.date.slice(0, 10) }</td>
                            <td onClick={()=> handleDelete(meal._id)}><Backspace /></td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <Link to="/meals/new"> <Button variant="outline-dark">Add Meal</Button>
            </Link>
        </div>
    )

}

export default MealList
