import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Restaurants from '../data/restaurants.json';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Categories from '../components/Categories/Categories';
import Alert from '@mui/material/Alert';
import MenuGrid from '../components/Menu/Menu';

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



  return (
    <div>
      <Header restaurant={restaurant}></Header>
      {
        restaurant === '' || menu.categories === undefined || menu.items === undefined ?
          <Container maxWidth="lg"><Alert severity="error" sx={{ mt: 4 }}>Unable to find your restaurant with this subdomain:{CURRENT_SUBDOMAIN}</Alert></Container> :
          <Container maxWidth="lg">
            <Categories categories={menu.categories} buttonClickHandler={handleCategoryChange} currentCategoryId={currentCategoryId}></Categories>
            <MenuGrid menuItems={menu.items} currentCategoryId={currentCategoryId}></MenuGrid>
          </Container>
      }
      <Footer></Footer>
    </div>
  )
}

export default Restaurant
