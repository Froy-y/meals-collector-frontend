import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const NewForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const initialState = {
        name: "",
        meal: "",
        calories: 0,
        date: startDate
    }
    const [input, setInput] = useState(initialState)


    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    //Fetch post
    const newMeals = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const createdMeal = await fetch("http://localhost:9000/meals", configs)
            const parsed = await createdMeal.json()
            props.history.push('/meals')
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setInput(initialState)
        newMeals(input)
    }

    return(
        <div className="form-section">
            <form onSubmit={ handleSubmit }>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={ input.name } onChange={handleChange} />
                <label htmlFor="meal">Meal Time</label>
                <input id="meal" name="meal" value={ input.meal } onChange={handleChange} />
                <label htmlFor="calories">Calories</label>
                <input id="calories" name="calories" value={ input.calories } onChange={handleChange} />
                <label htmlFor="date">Date</label>
                <DatePicker id="date" name="date" value={input.date} selected={startDate} onChange={(date) => setStartDate(date)} />
                <input type="submit" value="Add a meal" />
            </form>
            <Link to="/meals">View Meals</Link>
        </div>
    )
}

export default NewForm
