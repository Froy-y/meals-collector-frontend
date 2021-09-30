import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Form, Button} from 'react-bootstrap'

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

          <Form onSubmit={ handleSubmit }>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="What did you eat?" value={ input.name } onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="meal">
              <Form.Label>Meal Time</Form.Label>
              <Form.Control type="text" placeholder="Which meal?" value={ input.meal } onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="calories">
              <Form.Label>Calories</Form.Label>
              <Form.Control type="text" placeholder="How many calories?" value={ input.calories } onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Name</Form.Label>
              <Form.Control type="date" placeholder="When did you eat this?" value={ input.date } onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            </Form>

            <Link to="/meals">Back</Link>
        </div>
    )
}

export default NewForm
