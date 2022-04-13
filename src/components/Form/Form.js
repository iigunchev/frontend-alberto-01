import React, { useState } from 'react'

const initialFormValues = {
    username: '',
    message: ''
}


const Form = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');

    const [pending, setPending] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const validateForm = values => {
        const {username, message} = values;
        let usernameError = '';
        let messageError = '';
    
        if (!username) usernameError = 'Please enter a username';
        if (!message) messageError = 'Please enter a message';
    
    
        if (usernameError || messageError) {
            setFormErrors({username: usernameError, message: messageError});
            return false;
        }
        
        return true;
    }
    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validateForm(formValues);
        if (isValid) {
            setPending(true);
            console.log(formValues);
            // Reset form values
            setFormValues(initialFormValues);
            setFormErrors('')
        }
    }

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
                <div>{formErrors.username}</div>
                <textarea 
                    name="message" 
                    placeholder="Message"
                    onChange={handleChange}
                    value={formValues.message}
                />
                <div>{formErrors.message}</div>
                <button 
                    type="submit"
                    disabled={pending ? true : false}
                >Post</button>
            </form>
        </section>
    )
}

export default Form