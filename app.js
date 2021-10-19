const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



// view engine
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://raghu2662:1234@0987Rk@cluster0.wb5js.mongodb.net/Company-Users?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/items', requireAuth,(req, res) => res.render('items'));
app.use(authRoutes)


// //cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('set-cookie','newUser = true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24F});
//   res.send('you got the cookies !');

// });

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);

// })