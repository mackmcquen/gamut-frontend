import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../actions/auth';
import ArtworkContainer from '../containers/ArtworkContainer';
import TextField from '@material-ui/core/TextField';
import BrushIcon from '@material-ui/icons/Brush';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

class Search extends Component {

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
          pageNumber: 1,
          searchTerm: '',
          artworks: [],
          totalResults: 0,
          user: []
        }
    }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      submitSearch = (e) => {
        e.preventDefault()
        this.fetchArt()
      }
    
      fetchArt = () => {
        let searchTerm = this.state.searchTerm
        let pageNumber = this.state.pageNumber
        const proxyURL = 'https://cors-anywhere.herokuapp.com/'
        const artworkURL = `https://www.wikiart.org/en/api/2/PaintingSearch?term=${searchTerm}&pagination`
        fetch(proxyURL + artworkURL)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    artworks: data.data,
                    pageNumber: this.state.pageNumber,
                    searchTerm: ''
                })
            })
      }

    render() {
        return(
            <div>
                <div className='Search-div'>
                      <Typography className='Greeting-title' variant='h4'>Hello, {this.state.user.username}.</Typography>
                    <Box m={3}>
                      <Typography className='Search-title' variant='h3'>What are you looking for?</Typography>
                    </Box>
                    <form onSubmit={ (e) => this.submitSearch(e) }>
                        <TextField className='Search-bar' id='search' onChange={ this.handleChange } name='searchTerm' type='text' value={ this.state.searchTerm } fontSize='18px' placeholder='artist, title, date...' autoComplete='off' />
                        <Tooltip title='Search'>
                          <IconButton color='primary' type='submit'>
                              <BrushIcon />
                          </IconButton>
                        </Tooltip>
                    </form>
                </div>
                <ArtworkContainer 
                    artworks={this.state.artworks}
                    pageNumber={this.state.pageNumber}
                    fetchMore={this.fetchMore}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
