import React, { useState, useEffect } from 'react'

const EditForm = (props) => {
    const initialState = {
        name: '',
        meal: '',
        calories: 0,
    }
    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)

    const getMeals = async (id) => {
        try {
            const id = props.match.params.id
            const foundMeal = await fetch(`http://localhost:9000/meals/${id}`)
            const parsed = await foundMeal.json()
            setInput(parsed)
            setLoading(false)
        } catch (err) {
            console.log(err)
            props.history.push('/meals')
        }
    }
    
    const updateMeal = async (id, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const updateMeal = await fetch(`http://localhost:9000/meals/${id}`, configs)
        const parsed = await updateMeal.json()
        props.history.push(`/holidays/${id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, meal, calories } = input
        const mealData = { name, meal, calories }
        updateMeal(input._id, mealData)
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    useEffect(()=> {
        getMeals()
    }, [])

    return(
        <div>
            <h1>Edit Form</h1>
            { loading ? <h3>...loading</h3> :
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={ input.name } onChange={ handleChange } />
                </div>
                <div>
                    <label htmlFor="meal">Meal</label>
                    <input id="meal" name="meal" value={ input.meal } onChange={ handleChange } />
                </div>
                <div>
                    <label htmlFor="calories">Calories</label>
                    <input id="calories" name="calories" value={ input.calories } onChange={ handleChange } />
                </div>
                <div>
                    <input type="submit" value="Edit Meal" />
                </div>
            </form>
            }
        </div>
    )
}

export default EditForm