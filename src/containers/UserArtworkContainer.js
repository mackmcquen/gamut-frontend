import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserArtwork from '../components/UserArtwork';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

class UserArtworkContainer extends Component {
    renderArtworks = () => {
        return this.props.collection.map(userArtwork =>   {
            return(
                <Grid item xs={4}>
                    <Paper className='Artwork-card' elevation={3}>
                        <UserArtwork userArtwork={userArtwork} key={userArtwork.id} user={this.props.auth} deleteUserArtwork={this.props.deleteUserArtwork} />
                    </Paper>
                </Grid>
            )
        })
    }

    render() {
        console.log(this.props.collection)
        return(
            <div>
                <div>
                    <Grid
                        spacing={3}
                        container direction='row'
                        justify='space-evenly'
                        alignItems='flex-start'
                    >
                        {this.renderArtworks()}
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
}

export default connect(mapStateToProps, null)(UserArtworkContainer);
