import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header(props) {

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <img src={props.restaurant.logo_url} alt={props.restaurant.name} style={{ width: 50 }} />
          <Typography variant="h6" style={{ margin: 'auto' }}>
            {props.restaurant.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
