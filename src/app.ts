import  'dotenv/config';
import express from 'express';
import webRoutes from './routes/web';
import getConnection from './config/database';
const app = express();
const port = process.env.PORT || 3000;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//config static files
app.use(express.static('public'));

// config routes
webRoutes(app);

// start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})