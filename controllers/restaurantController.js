import { getRestaurantsWithMenus } from '../services/restaurantService.js';
// controller: receives the HTTPS request

// handles the GET requests
export function showRestaurants(req, res, next) {
  try {
    // assigns the service layer to get each restaurant with its menus
    const restaurants = getRestaurantsWithMenus();

    // renders views/restaurants.ejs and pass its data
    res.render('restaurants', {
        title: 'Restaurants',
        restaurants: restaurants,
    })
  } catch (error) {
    next(error);
  }
}