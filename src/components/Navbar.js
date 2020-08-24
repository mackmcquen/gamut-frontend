import React, { Component } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

class Navbar extends Component {
    
    render() {
        return(
            <AppBar position='static' style={{background: 'black'}}>
                <Toolbar>
                    <Button href='/search' style={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Search
                        </Typography>
                    </Button>
                    <Button href='/collection' style={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Collection
                        </Typography>
                    </Button>
                    <Button href='/account' style={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            Account
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;
