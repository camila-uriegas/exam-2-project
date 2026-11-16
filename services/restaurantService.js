import { restaurants, menuItems } from './dataStore.js';

// gets all restaurants
export function getAllRestaurants() {
  return restaurants;
}

// gets all menuitems
export function getMenuByRestaurant(restaurantId) {
    return menuItems.filter((item) => item.restaurantId === restaurantId);
}

// each restaurant with their Menu items
export function getRestaurantsWithMenus() {
    return restaurants.map((restaurant) => ({
        ...restaurant,
        menu: getMenuByRestaurant(restaurant.id),
    }));
}

export function getRestaurantById(id) {
  return restaurants.find((restaurant) => restaurant.id === id);
}

