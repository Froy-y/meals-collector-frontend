import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div>
            <table>
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
                            <td>{ meal.name }</td>
                            <td>{ meal.meal }</td>
                            <td>{ meal.calories }</td>
                            <td>{ meal.date.slice(0, 10) }</td>
                            <td onClick={()=> handleDelete(meal._id)}>X</td>
                            <td><Link to={ `/meals/${meal._id}` }>Show Page</Link></td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <Link to="/meals/new">Create New Meal</Link>
        </div>
    )

}

export default MealList