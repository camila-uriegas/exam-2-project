import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;   // port number for the server


app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title : 'Home' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});