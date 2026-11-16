import express from 'express';
import path from 'path';
import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js';
import session from 'express-session';
import reservationRoutes from './routes/reservationRoutes.js';


const app = express();
const PORT = 3000;   // port number for the server

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'change-this-to-any-long-random-string',
  resave: false,
  saveUninitialized: false,
}));

// middleware to make the user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.get('/', (req, res) => {
    res.render('index', { title : 'Home' });
});

app.use('/restaurants', restaurantRoutes);
app.use('/', authRoutes);

app.use('/reserve', reservationRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

