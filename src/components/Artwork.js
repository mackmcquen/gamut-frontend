import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

const backendArtworksAPI = 'http://localhost:3001/artworks'
const artworkCollectionsAPI = 'http://localhost:3001/artwork_collections'

class Artwork extends Component {

    handleSave = () => {
        // Assemble the object to send to backend
        // Make POST request to artworks controller
        // Add artwork to current user's collection
        const artDetails = {
            title: this.props.art.title,
            image: this.props.art.image,
            artist: this.props.art.artistName,
            date: this.props.art.completitionYear
        }
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(artDetails)
        }
        fetch(backendArtworksAPI, reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            console.log(this.props.user)
            const collectionDetails = {
                collection_id: this.props.user.id,
                artwork_id: data.id
            }
            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(collectionDetails)
            }
            fetch(artworkCollectionsAPI, reqObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.props)
        const divStyle = {
            height: '75%',
            width: '75%'
        }

        return(
            <div>
                <Typography className='Artwork-info' variant='h4'>{this.props.art.title}</Typography>
                <img src={`${this.props.art.image}`} alt='Artwork' style={divStyle} />
                <div className='Artwork-info'>
                    <Typography className='Artwork-info' variant='h5'>{this.props.art.artistName}</Typography>
                    <Typography className='Artwork-info' variant='h6'>{this.props.art.completitionYear}</Typography>
                    <Button variant='contained' color='primary' onClick={this.handleSave} type='submit'>Add to Collection</Button>
                </div>
            </div>
        )
    }
}

export default Artwork;
