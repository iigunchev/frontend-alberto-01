import React, { useState } from 'react';
import { postTweet } from '../../services/tweets';

const initialFormValues = {
    username: '',
    message: ''
}



const Form = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');

    const [queryStatus, setQueryStatus] = useState('');
    const [postError, setPostError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
        
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
        if (!isValid) return;

        setQueryStatus('pending');
        postTweet(formValues)
            .then(res => {
                if(res === 'error') {
                    setPostError('There has been an error.')
                    setQueryStatus('');
                }
                if(res === 'ok') {
                    setQueryStatus('success');
                }
            })
            .catch(error => setPostError({fetchError: error}));
        // Reset form values
        setFormValues(initialFormValues);
        setFormErrors('')
        
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
                    disabled={queryStatus === 'pending' ? true : false}
                >Post</button>
            </form>
            <div>{postError}</div>
        </section>
    )
}

export default Form