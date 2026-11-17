import {
  getReservationsByRestaurant,
  findReservationById,
  deleteReservation,
} from '../services/reservationService.js';
import { ValidationError } from '../services/authService.js';

// builds the dashboard page 
function renderDashboard(res, { query = '', error = null, message = null, status = 200 } = {}) {
  let searchResult = null;
  let searchMessage = null;

  if (query) {
    searchResult = findReservationById(query);
    if (!searchResult) searchMessage = 'No reservation found with that ID.';
  }

  res.status(status).render('manager', {
    title: 'Manager Dashboard',
    groups: getReservationsByRestaurant(),
    query,
    searchResult,
    searchMessage,
    error,
    message,
  });
}

// GET /manager  
export function showDashboard(req, res, next) {
  try {
    const query = String(req.query.q ?? '').trim();
    const message = req.query.deleted ? 'Reservation deleted.' : null;
    renderDashboard(res, { query, message });
  } catch (error) {
    next(error);
  }
}

// POST /manager/reservations/:id/delete
export function handleDelete(req, res, next) {
  try {
    deleteReservation(req.params.id);
    res.redirect('/manager?deleted=1');
  } catch (error) {
    if (error instanceof ValidationError) {
      return renderDashboard(res, { error: error.message, status: error.status });
    }
    next(error);
  }
}