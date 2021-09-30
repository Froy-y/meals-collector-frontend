import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewForm = (props) => {
    const initialState = {
        name: "",
        meal: "",
        calories: 0,
        date: ""
    }
    const [input, setInput] = useState(initialState)

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addMeal(input)
        setInput(initialState)
        console.log(input)
    }

    const [startDate, setStartDate] = useState(new Date());


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
                <DatePicker id="date" name="date" selected={startDate} onChange={(date) => setStartDate(date)} />
                <input type="submit" value="Add a meal" />
            </form>
        </div>
    )
}

export default NewForm
