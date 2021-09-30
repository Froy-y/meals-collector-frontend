import React, { useState, useEffect } from 'react'

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

    return(
        <div class="form-section">
            <form onSubmit={ handleSubmit }>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={ input.name } onChange={handleChange} />
                <label htmlFor="meal">Meal Time</label>
                <input id="meal" name="meal" value={ input.meal } onChange={handleChange} />
                <label htmlFor="calories">Calories</label>
                <input id="calories" name="calories" value={ input.calories } onChange={handleChange} />
                <label htmlFor="date">Date</label>
                <input id="date" name="date" value={ input.date } onChange={handleChange} />
                <input type="submit" value="Add a meal" />
            </form>
        </div>
    )
}

export default NewForm