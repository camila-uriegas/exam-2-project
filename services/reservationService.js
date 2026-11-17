import { users, restaurants, tables, reservations, getNextId } from './dataStore.js';
import { Reservation } from './objects.js';
import { ValidationError } from './authService.js';
import { getRestaurantById } from './restaurantService.js';

// hour slots for each restaurant
export function getTimeSlots(restaurant) {
  const slots = [];
  for (let hour = restaurant.openHour; hour < restaurant.closeHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
  }
  return slots;
}

// tables at the restaurant that are free at this date and time
export function getAvailableTables(restaurantId, date, time, partySize) {
  return tables.filter((table) => {
    const sameRestaurant = table.restaurantId === restaurantId;
    const inService = table.status === 'available';
    const fits = table.capacity >= partySize;
    const alreadyBooked = reservations.some(
      (r) => r.tableId === table.id && r.date === date && r.time === time
    );

    return sameRestaurant && inService && fits && !alreadyBooked;
  });
}

// TODO: validate everything, then create and return the Reservation
export function createReservation({ userId, restaurantId, tableId, date, time, partySize }) {
    // get the values
    date = String(date ?? '').trim();
    time = String(time ?? '').trim();
  
    if(!date || !time || !tableId || !partySize){
        throw new ValidationError('Please complete all the fields for the reservation.');
    }

    restaurantId = Number(restaurantId);
    tableId = Number(tableId);
    partySize = Number(partySize);
    // party size has to be number and cant be 0
    if(!Number.isInteger(partySize) || partySize < 1){
        throw new ValidationError('Party size has to be a number bigger than 0.');
    }
    // when restaurant is not found
    const restaurant = getRestaurantById(restaurantId);
    if(!restaurant){
        throw new ValidationError('Restaurant not found!', 404);
    }
    // if table is already booked
    const table = tables.find((t) => t.id === tableId && t.restaurantId === restaurantId);
    if(!table || table.status !== 'available') {
        throw new ValidationError('That table is not available!');
    }

    // cannot exceed table capacity
    if(partySize > table.capacity){
        throw new ValidationError(`Party size cannot be bigger than ${table.capacity} people.`);
    }

    // has to be between restaurant hours
    if (!getTimeSlots(restaurant).includes(time)) {
        throw new ValidationError('The restaurant is closed at that time.');
    }

    // cannot be a date and time in the past
    const when = new Date(`${date}T${time}`);
    if (Number.isNaN(when.getTime()) || when <= new Date()) {
        throw new ValidationError('Please choose a future date and time.');
    }

    // if date and time is already reserved
    const alreadyBooked = reservations.some(
        (r) => r.tableId === tableId && r.date === date && r.time === time
    );
    if (alreadyBooked) {
        throw new ValidationError(
            'That table is already booked for this date and time. Please choose another.',
            409
        );
    }

    // create reservation and save it
    const reservation = new Reservation(
        getNextId('reservation'),
        userId,
        tableId,
        date,
        time,
        partySize,
        'confirmed'
    );
    reservations.push(reservation);
    return reservation;

}

// adds the names the dashboard needs (customer, table number, restaurant)
function describeReservation(r) {
  const table = tables.find((t) => t.id === r.tableId);
  const customer = users.find((u) => u.id === r.userId);
  const restaurant = restaurants.find((x) => table && x.id === table.restaurantId);
  return {
    ...r,
    restaurantId: restaurant ? restaurant.id : null,
    restaurantName: restaurant ? restaurant.name : 'Unknown',
    tableNumber: table ? table.tableNumber : '?',
    customerName: customer ? customer.name : 'Unknown',
  };
}

// every restaurant with its reservations
export function getReservationsByRestaurant() {
  const all = reservations.map(describeReservation);
  return restaurants.map((restaurant) => ({
    ...restaurant,
    reservations: all.filter((r) => r.restaurantId === restaurant.id),
  }));
}

// one reservation by ID, or null
export function findReservationById(id) {
  const reservation = reservations.find((r) => r.id === Number(id));
  return reservation ? describeReservation(reservation) : null;
}

// removes a reservation from the collection
export function deleteReservation(id) {
  const index = reservations.findIndex((r) => r.id === Number(id));
  if (index === -1) {
    throw new ValidationError('Reservation not found.', 404);
  }
  reservations.splice(index, 1);   // splice keeps the same array; never reassign an exported array
}
