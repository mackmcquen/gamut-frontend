import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../actions/auth';
import { Typography, Button, Box } from '@material-ui/core'

class Account extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log(token)
        if (!token) {
          this.props.history.push('/login')
        } else {
          const reqObj = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
          console.log(reqObj)
          fetch('http://localhost:3001/current_user', reqObj)
            .then(resp => resp.json())
            .then(user => {
              console.log(user)
              if (user.error) {
                this.props.history.push('/login')
              } else {
                // Update the Redux store with User
                this.props.currentUser(user)
                this.setState({
                    user: user
                })
              }
            })
        }
    }

    constructor() {
        super()
        this.state = {
            user: []
        }
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logoutUser()
    }

    render() {
        return(
            <div className='Particle-js'>
                <div className='Account-card'>
                    <Typography className='Account-details' variant='h4'>
                        {this.state.user.username}
                    </Typography>
                    <Typography className='Account-details' variant='h4'>
                        {this.state.user.email}
                    </Typography>
                </div>
                    <Box m={3}>
                        <Button className='Logout-button' type='submit' onClick={this.handleLogout} href='/login' variant='contained' color='primary'>Logout</Button>
                    </Box>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  
const mapDispatchToProps = {
    currentUser
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Account);  
