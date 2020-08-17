import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

const usersAPI = `http://localhost:3001/users`

class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    signupUser = (e) => {
        e.preventDefault()
        console.log('-----------------')
        // Send the user info to the backend
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({user: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }})
        }
        fetch(usersAPI, reqObj)
            .then(resp => resp.json())
            .then(user => {
                if (this.state.email && this.state.username && this.state.password !== '') {
                    console.log(user)
                    // Redirect to /search path
                    this.props.history.push(`/search`)
                } else {
                    alert('Please fill all fields')
                }
            })
    }

    render() {
        return (
            <div className='Signup-form'>
                <Box m={3}>
                <Typography className='Signup-title' variant='h4'>Welcome aboard.</Typography>
                </Box>
                <form onSubmit={ this.signupUser }>
                    <Box m={-1}>
                        <TextField className='Signup-input' id='email' onChange={ this.handleChange } type='email' value={ this.state.email } variant='filled' label='Email' autoComplete='off' />
                    </Box>
                    <br />
                    <Box m={1}>
                        <TextField className='Signup-input' id='username' onChange={ this.handleChange } type='text' value={ this.state.username } variant='filled' label='Username' autoComplete='off' />
                    </Box>
                    <br />
                    <Box m={-1}>
                        <TextField className='Signup-input' id='password' onChange={ this.handleChange } type='password' value={ this.state.password } variant='filled' label='Password' autoComplete='off' />
                    </Box>
                    <br />
                    <Box m={1}>
                        <Button className='Signup-button' type='submit' variant='contained' color='primary'>Sign Up</Button>
                    </Box>
                </form>
                <Box m={2}>
                    <Link to={`/login`} className='Login-link' type='button'>Have an account? Login</Link>
                </Box>
            </div>
        )
    }
}

export default Signup;
