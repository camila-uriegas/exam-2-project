import { getRestaurantById } from '../services/restaurantService.js';
import { getTimeSlots, getAvailableTables, createReservation } from '../services/reservationService.js';
import { ValidationError } from '../services/authService.js';

// creates the page
function renderReserve(res, restaurant, { date = '', time = '', partySize = '', error = null, reservation = null, status = 200 } = {}) {
  const searched = date && time && partySize;
  const availableTables = searched
    ? getAvailableTables(restaurant.id, date, time, Number(partySize))
    : null;

  // only shows today and forward
  const today = new Date().toLocaleDateString('en-CA');

  res.status(status).render('reserve', {
    title: 'Reserve',
    restaurant,
    slots: getTimeSlots(restaurant),
    date, time, partySize, today,
    availableTables,
    error,
    reservation,
  });
}

// GET /reserve/:restaurantId  
export function showReserveForm(req, res, next) {
  try {
    const restaurant = getRestaurantById(Number(req.params.restaurantId));
    if (!restaurant) return res.status(404).send('Restaurant not found.');

    const { date, time, partySize } = req.query;
    renderReserve(res, restaurant, { date, time, partySize });
  } catch (error) {
    next(error);
  }
}

// POST /reserve/:restaurantId
export function handleReserve(req, res, next) {
  try {
    const restaurant = getRestaurantById(Number(req.params.restaurantId));
    if (!restaurant) return res.status(404).send('Restaurant not found.');

    try {
      const reservation = createReservation({
        userId: req.session.user.id,          // from the session, never from the form
        restaurantId: restaurant.id,
        tableId: req.body.tableId,
        date: req.body.date,
        time: req.body.time,
        partySize: req.body.partySize,
      });
      renderReserve(res, restaurant, { reservation });
    } catch (error) {
      if (error instanceof ValidationError) {
        const { date, time, partySize } = req.body;
        return renderReserve(res, restaurant, { date, time, partySize, error: error.message, status: error.status });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
}