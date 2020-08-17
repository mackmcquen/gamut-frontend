import React, { Component } from 'react';
import { connect } from 'react-redux';
import Artwork from '../components/Artwork';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

class ArtworkContainer extends Component {
    renderArtworks = () => {
        return this.props.artworks.map(art =>   {
            return(
                <Grid item xs={4}>
                    <Paper className='Artwork-card' elevation={3}>
                        <Artwork art={art} key={art.id} user={this.props.auth} />
                    </Paper>
                </Grid>
            )
        })
    }

    render() {
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

export default connect(mapStateToProps, null)(ArtworkContainer);
