import express from 'express';
import User from '../controllers/userController.js';

const Router = express.Router();

Router
  .get('/user',  User.get)
  .get('/user/:id',  User.get_by_id)
  .post('/user', User.add)
  .put('/user',  User.update)
  .delete('/user',  User.delete);

export default Router;
