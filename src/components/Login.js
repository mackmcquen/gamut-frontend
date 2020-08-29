import React from 'react';
import { loginSuccess } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';

const authAPI = `https://gamutart.herokuapp.com/auth`

class Login extends React.Component {
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

    loginUser = (e) => {
        e.preventDefault()
        // Send the user info to the backend
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        fetch(authAPI, reqObj)
            .then(resp => resp.json())
            .then(user => {
                if (user.error) {
                    alert(user.error)
                } else {
                    console.log(user)
                    localStorage.setItem('token', user.token)
                    this.props.loginSuccess(user)
                    // Redirect to /search path
                    this.props.history.push(`/signup`)
                }
            })
    }

    render() {
        return (
            <div className='Signup-form'>
                <img src='../gamut.png' alt='Gamut' className='Gamut-logo' />
                <Box m={3}>
                <Typography className='Signup-title' variant='h4'>Welcome back.</Typography>
                </Box>
                <form onSubmit={ this.loginUser }>
                    <Box m={-1}>
                        <TextField className='Signup-input' id='username' onChange={ this.handleChange } type='text' value={ this.state.username } variant='filled' label='Username' autoComplete='off' />
                    </Box>
                    <br />
                    <Box m={1}>
                        <TextField className='Signup-input' id='password' onChange={ this.handleChange } type='password' value={ this.state.password } variant='filled' label='Password' autoComplete='off' />
                    </Box>
                    <br />
                    <Box m={-1}>
                        <Button className='Signup-button' type='submit' variant='contained' color='primary'>Login</Button>
                    </Box>
                </form>
                <Box m={3}>
                    <Link to={`/signup`} className='Login-link' type='button'>New to Gamut? Sign-Up</Link>
                </Box>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginSuccess
}
  
export default connect(null, mapDispatchToProps)(Login);
