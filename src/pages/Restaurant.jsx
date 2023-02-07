import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Restaurants from '../data/restaurants.json';
import LinesEllipsis from 'react-lines-ellipsis'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Categories from '../components/Categories/Categories';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const CURRENT_SUBDOMAIN = window.location.host.split('.')[0];
const isLocalEnv = window.location.host.includes("localhost");

/** Get Restaurant object from URL params */
const getRestaurant = () => {
  /** Get restaurant name from queryparam */
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (params && params['restaurant']) {
    const restaurantName = params['restaurant'];
    const restaurantObj = Restaurants.filter(restaurant => restaurant.slung_url === restaurantName);
    if (restaurantObj.length > 0)
      return restaurantObj[0];
  }

  /** Get restaurant name from subdomain */
  const filteredList = Restaurants.filter(restaurant => restaurant.slung_url === CURRENT_SUBDOMAIN);
  if (filteredList.length > 0)
    return filteredList[0];
  else if (isLocalEnv) {
    const localEnvRestaurantList = Restaurants.filter(restaurant => restaurant.slung_url === 'burger-king-local');
    return localEnvRestaurantList.length > 0 ? localEnvRestaurantList[0] : '';
  }
  else
    return '';
}

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(getRestaurant());
  const [menu, setMenu] = useState({});
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const handleCategoryChange = (categoryIdIn) => {
    setCurrentCategoryId(categoryIdIn);
  }

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/menus/${restaurant.menu_end_point}`)
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      });
  }, [])

  const RenderMenu = (menuItems) =>
    menuItems.filter((el) => {
      return el.category_id === currentCategoryId + '' || currentCategoryId === 0
    })
      .map((item) => {
        return (
          <Grid key={item.id} item sm={6} md={3}>
            <Card >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image={item.images.length > 0 ? item.images[0] : `${process.env.PUBLIC_URL}/images/skelitons/image-placeholder.png`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <LinesEllipsis
                    text={item.description}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                  <Box component="div" sx={{ mt: 1 }} style={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="body1">
                      Price
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: "auto" }}>
                      $10
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>)
      });

  return (
    <div>
      <Header restaurant={restaurant}></Header>
      {
        restaurant === '' || menu.catergories === undefined || menu.items === undefined ?
          <Container maxWidth="lg"><Alert severity="error" sx={{ mt: 4 }}>Unable to find your restaurant with this subdomain:{CURRENT_SUBDOMAIN}</Alert></Container> :
          <Container maxWidth="lg">
            <Categories categories={menu.catergories} buttonClickHandler={handleCategoryChange} currentCategoryId={currentCategoryId}></Categories>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {RenderMenu(menu.items)}
            </Grid>
          </Container>
      }
      <Footer></Footer>
    </div>
  )
}

export default Restaurant
