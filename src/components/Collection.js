import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../actions/auth';
import UserArtworkContainer from '../containers/UserArtworkContainer';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search'


const usersURL = 'https://gamutart.herokuapp.com/users'
const userArtworksURL = 'https://gamutart.herokuapp.com/artworks'

class Collection extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log(token)
        if (!token) {
            this.props.history.push('/')
        } else {
            const reqObj = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            console.log(reqObj)
            fetch('https://gamutart.herokuapp.com/current_user', reqObj)
            .then(resp => resp.json())
            .then(user => {
                console.log(user)
                if (user.error) {
                    this.props.history.push('/')
                } else {
                    // Update the Redux store with User
                    this.props.currentUser(user)
                }
                fetch(`${usersURL}/${user.id}`)
                .then(resp => resp.json())
                .then(data => this.setState({
                    collection: data.artworks,
                    user: user
                }))
            })
        }
    }

    constructor() {
        super()
        this.state = {
            collection: [],
            filteredSearch: '',
            user: {}
        }
    }

    handleSearch = (e) => {
        this.setState({
          filteredSearch: e.target.value
        })
    }
    
    filteredCollection = () => {
        const filtered = this.state.collection.filter(userArtwork => {
          return(
            userArtwork.title.toLowerCase().includes(this.state.filteredSearch.toLowerCase())
            // userArtwork.artist.toLowerCase().includes(this.state.filteredSearch.toLowerCase()) ||
            // userArtwork.date.toLowerCase().includes(this.state.filteredSearch.toLowerCase())
          )
        })
        if (filtered.length === 0) {
            return []
        } else {
            return filtered
        }
    }

//     filteredCollection = () => {
//         const title =  this.state.collection.filter(userArtwork => {
//               return userArtwork.title.toLowerCase().includes(this.state.filteredSearch.toLowerCase())
//         })
//         const artist =  this.state.collection.filter(userArtwork => {
//               return userArtwork.artist.toLowerCase().includes(this.state.filteredSearch.toLowerCase())
//         })
//         const date =  this.state.collection.filter(userArtwork => {
//               return userArtwork.date.toLowerCase().includes(this.state.filteredSearch.toLowerCase())
//         })
              
//     console.log(title, artist, date)
//     return(
//         title
//     )
//   }

    deleteUserArtwork = (userArtwork) => {
        const deleteFilter = this.state.collection.filter(userArtworkObj => {
          return userArtworkObj.id !== userArtwork.id
        })
          this.setState({
            collection: deleteFilter
          })
    
        const configObj = { method: 'DELETE' }
    
        fetch(`${userArtworksURL}/${userArtwork.id}`, configObj)
    }

    renderCollection = () => {
        return(
            <div>
                <TextField className='Search-bar' id='search' onChange={ this.handleSearch } name='searchTerm' type='text' value={ this.state.searchTerm } fontSize='18px' placeholder='Filter by Title' autoComplete='off' />
                    <Tooltip title='Filter'>
                        <IconButton color='primary' type='submit'>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                <UserArtworkContainer collection={this.filteredCollection()} deleteUserArtwork={this.deleteUserArtwork} />
            </div>
        )
    }

    render() {
        console.log(this.state.collection)
        console.log(this.state.user.id)
        // console.log(this.filteredCollection())
        return(
            <>
                {this.state.user ?
                    this.renderCollection() :
                    null
                }
            </>
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
