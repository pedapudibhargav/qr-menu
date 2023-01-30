import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Restaurants from '../data/restaurants.json';
import MenuItems from '../data/menus/burger-king.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const menu =
  MenuItems.items.map((item) => {
    return (
      <Grid item sm={6} md={4} lg={3}>
        <Card key={item.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={item.images.length > 0 ? item.images[0] : ''}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>)
  });

function Restaurant(props) {
  return (
    <div>
      <Header></Header>
      <Container fixed>
        <Grid container spacing={2}>
          {menu}
        </Grid>
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default Restaurant
