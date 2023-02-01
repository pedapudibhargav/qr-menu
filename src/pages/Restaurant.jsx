import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Restaurants from '../data/restaurants.json';
import MenuItems from '../data/menus/burger-king.json';
import LinesEllipsis from 'react-lines-ellipsis'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Categories from '../components/Categories/Categories';

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(Restaurants['burger-king']);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const handleCategoryChange = (categoryIdIn) => {
    setCurrentCategoryId(categoryIdIn);
  }

  const menu =
    MenuItems.items.filter((el) => {
      return el.category_id === currentCategoryId+'' || currentCategoryId === 0
    })
      .map((item) => {
        return (
          <Grid item sm={6} md={3}>
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
                    <LinesEllipsis
                      text={item.description}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>)
      });

  return (
    <div>
      <Header restaurant={restaurant}></Header>
      <Container maxWidth="xl">
        <Categories categories={MenuItems.catergories} buttonClickHandler={handleCategoryChange} currentCategoryId={currentCategoryId}></Categories>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {menu}
        </Grid>
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default Restaurant
