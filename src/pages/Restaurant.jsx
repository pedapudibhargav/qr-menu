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

/** 
 * ~~~~~~~~~~~~~~~~~~~~~~~
 * Restaurant React component
 * ~~~~~~~~~~~~~~~~~~~~~~~
*/
function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(getRestaurant());
  const [menu, setMenu] = useState({});
  const [currentCategoryId, setCurrentCategoryId] = useState(-1);
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


  /** Returns Price HTML */
  const getPriceElement = (menuItem) => {
    // Supports 2 JSON structure  menuItem.price.amount and menuItem.price.amount. If not falls back to 'undefined'
    const itemPrice = menuItem.price && menuItem.price.amount ? menuItem.price.amount :
      menuItem.price ? menuItem.price : undefined;
    // Returns Price HTML if valid price is available if no price data is available empty string is returned
    return itemPrice ?
      <Box component="div" sx={{ mt: 1 }} style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="body1">
          Price
        </Typography>
        <Typography variant="body1" style={{ marginLeft: "auto" }}>
          ${itemPrice}
        </Typography>
      </Box> : ''
  }

  /** Returns Image DOM if valid Image data is present if not emptry string is returned */
  const getImageElement = (menuItem) => {
    const menuItemHasImage = menuItem.images && menuItem.images.length > 0;
    return menuItemHasImage ?
      <CardMedia
        component="img"
        height="240"
        image={menuItem.images[0]}
        alt="green iguana"
      /> : '';
  }

  /** Renders Menu HTML */
  const RenderMenu = (menuItems) =>
    menuItems.filter((el) => {
      return el.category_id == currentCategoryId || currentCategoryId === -1
    })
      .map((item) => {
        // PENDING: Create 72 blank characters
        let blank72Characters = '_';
        // [...Array(5).keys()].forEach(element => blank72Characters = blank72Characters + '     ');

        return (
          <Grid key={item.id} item sm={6} md={3}>
            <Card >
              <CardActionArea>
                {getImageElement(item)}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <LinesEllipsis
                    text={item.description ? item.description : blank72Characters}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                  {getPriceElement(item)}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>)
  });

  return (
    <div>
      <Header restaurant={restaurant}></Header>
      {
        restaurant === '' || menu.categories === undefined || menu.items === undefined ?
          <Container maxWidth="lg"><Alert severity="error" sx={{ mt: 4 }}>Unable to find your restaurant with this subdomain:{CURRENT_SUBDOMAIN}</Alert></Container> :
          <Container maxWidth="lg">
            <Categories categories={menu.categories} buttonClickHandler={handleCategoryChange} currentCategoryId={currentCategoryId}></Categories>
            <Grid container spacing={2} sx={{ mt: 1 }} alignItems="stretch">
              {RenderMenu(menu.items)}
            </Grid>
          </Container>
      }
      <Footer></Footer>
    </div>
  )
}

export default Restaurant
