import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../actions/auth'

const usersURL = 'http://localhost:3001/users'

class Collection extends Component {

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
              }
            })
        }
    }

    fetchCollection = () => {
        fetch(usersURL)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    render() {
        return(
            <div>

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
  
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
