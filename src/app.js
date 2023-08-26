import express from 'express';
import passport from 'passport';
import Routes from './routes/index.js';
import authController from './controllers/authController.js';

const app = express();

app.use('/', express.static('public/'));
app.use('/uploads', express.static('uploads/'));

// configure passport authentication
authController(passport);

Routes(app);

export default app;
