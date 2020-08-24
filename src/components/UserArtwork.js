import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'

class UserArtwork extends Component {

    render() {
        console.log(this.props)
        const divStyle = {
            height: '75%',
            width: '75%'
        }

        return(
            <div>
                <Typography className='Artwork-info' variant='h4'>{this.props.userArtwork.title}</Typography>
                <a href={`${this.props.userArtwork.image}`} target="_blank">
                    <img src={`${this.props.userArtwork.image}`} alt='Artwork' style={divStyle} />
                </a>
                <div className='Artwork-info'>
                    <Typography className='Artwork-info' variant='h5'>{this.props.userArtwork.artist}</Typography>
                    <Typography className='Artwork-info' variant='h6'>{this.props.userArtwork.date}</Typography>
                    <IconButton color='secondary' type='submit'>
                        <DeleteIcon onClick={() => {this.props.deleteUserArtwork(this.props.userArtwork)}} />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default UserArtwork;
