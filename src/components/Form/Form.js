import React, { useState } from 'react'

const initialFormValues = {
    username: '',
    message: ''
}

const postForm = async (url, values) => {
    const result =  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('error')
        }, 3000)
    })
    return result;
}

const Form = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');

    const [postPending, setPostPending] = useState(null);
    const [postSuccess, setPostSuccess] = useState(null);
    const [postError, setPostError] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    // Validation
    const validateForm = values => {
        const {username, message} = values;
        let usernameError = '';
        let messageError = '';
    
        if (!username) usernameError = 'Please enter a username';
        if (!message) messageError = 'Please enter a message';
        if (message.length > 144) usernameError = 'Message < 144 chars';
    
    
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
            setPostPending(true);
            postForm(formValues)
                .then(res => {
                    if(res === 'ok') {
                        setPostSuccess(true)
                        setPostPending(false);
                    }
                    if(res === 'error') {
                        setPostError('There has been an error.')
                        setPostPending(false);
                    }
                })
                .catch(error => setPostError({fetchError: error}));
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
                    disabled={postPending ? true : false}
                >Post</button>
            </form>
            <div>{postError}</div>
        </section>
    )
}

export default Form