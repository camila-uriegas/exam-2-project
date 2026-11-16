import { User, Login, Restaurant, Table, Reservation, MenuItem } from './objects.js';
import bcrypt from 'bcrypt';

// collections
export const users = [];
export const logins = [];
export const restaurants = [];
export const tables = [];
export const reservations = [];
export const menuItems = [];

// ID counters (one per object type)
const counters = {
  user: 1,
  login: 1,
  restaurant: 1,
  table: 1,
  reservation: 1,
  menuItem: 1,
};

// returns the current ID for that type, then moves the counter up by one
export function getNextId(type) {
  return counters[type]++;
}


// DATA

// RESTAURANTS
restaurants.push(new Restaurant(getNextId('restaurant'), 'Terras Urban Mexican Kitchen', '1212 E Washington St', 17, 23));
restaurants.push(new Restaurant(getNextId('restaurant'), 'Jolie Petite', '1105 E Adams St', 9, 22));
restaurants.push(new Restaurant(getNextId('restaurant'), 'Dodici Pizza & Wine', '1200 E Adams St', 12, 23));
restaurants.push(new Restaurant(getNextId('restaurant'), 'Morning Glory', '1049 E Washington St', 8, 15));


// TABLES
// rest 1 -> 1-5, rest 2 -> 6-10, rest 3 -> 11-15, rest 4 -> 16-20
restaurants.forEach((restaurant) => {
  for (let number = 1; number <= 5; number++) {
    tables.push(new Table(getNextId('table'), restaurant.id, number, 5, 'available'));
  }
});


// MENU ITEMS
// restaurant 1 -  Terras
menuItems.push(new MenuItem(getNextId('menuItem'), 1, 'Tacos al Pastor', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 1, 'Enchiladas Verdes', 14));
menuItems.push(new MenuItem(getNextId('menuItem'), 1, 'Caesar Salad', 16));
menuItems.push(new MenuItem(getNextId('menuItem'), 1, 'Pasta al Chipotle', 15));

// restaurant 2 - Jolie Petite
menuItems.push(new MenuItem(getNextId('menuItem'), 2, 'Pancakes with berries', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 2, 'Scrambled eggs', 10));
menuItems.push(new MenuItem(getNextId('menuItem'), 2, 'Yogurt with seasonal fruit', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 2, 'Waffles & Eggs', 14));

// restaurant 3 - Dodici
menuItems.push(new MenuItem(getNextId('menuItem'), 3, 'Margherita Pizza', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 3, 'Pesto Pizza', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 3, 'Mushroom Pizza', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 3, 'Spinach and Feta Pizza', 12));

// restaurant 4 - Morning Glory
menuItems.push(new MenuItem(getNextId('menuItem'), 4, 'Chilaquiles', 10));
menuItems.push(new MenuItem(getNextId('menuItem'), 4, 'Waffles and chicken', 12));
menuItems.push(new MenuItem(getNextId('menuItem'), 4, 'Scrambled eggs w/ protein', 13));
menuItems.push(new MenuItem(getNextId('menuItem'), 4, 'Yogurt with seasonal fruit', 10));


// USERS 
users.push(new User(getNextId('user'), 'Admin Manager', 'manager@restaurant.com', bcrypt.hashSync('manager123', 10), 'manager'));
users.push(new User(getNextId('user'), 'Ana Garcia', 'ana@example.com', bcrypt.hashSync('customer123', 10), 'customer'));


function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
// RESERVATIONS
reservations.push(new Reservation(getNextId('reservation'), 2, 4, daysFromNow(3), '19:00', 3, 'confirmed'));
reservations.push(new Reservation(getNextId('reservation'), 2, 10, daysFromNow(3), '11:00', 2, 'confirmed'));

