import React, { useState, useEffect } from 'react'

const initialFormValues = {
    username: '',
    message: ''
}

const Form = () => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formValues)
    }

    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues])

    return (
        <section>
            <form className="vertical" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    onChange={handleChange}
                    value={formValues.username}
                />
                <textarea 
                    name="message" 
                    placeholder="Message"
                    onChange={handleChange}
                    value={formValues.message}
                />
                <button type="submit">Post</button>
            </form>
        </section>
    )
}

export default Form