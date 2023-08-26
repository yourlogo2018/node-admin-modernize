import express from 'express';
import cookieParser from 'cookie-parser';
import user from './userRoutes.js';
import auth from './authRoutes.js';
import fileUpload from 'express-fileupload';
import flash from 'express-flash';
import session from 'express-session';
import path from 'path';
import { create } from 'express-handlebars';
import passport from 'passport';
import passportConfig from '../controllers/authController.js';


import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Routes = (app) => {
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Credentials', true);
    next();
  });

  //Session
  app.use(
    session({
      secret: "fe08d110883968aa79381d011134a6c8",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );
  passportConfig(passport);
  app.use(passport.initialize())
  app.use(passport.session())

  //Handlebars
  //app.set("views", path.join(`${__dirname}/src`, "views"));
  app.set("views", path.resolve(__dirname, '..', 'views'));
  app.engine('handlebars', create({
    defaultLayout: 'main',
    helpers: {
      json(context) { return JSON.stringify(context); }
    }
    }).engine
  );
  app.set('view engine', 'handlebars');
  app.use(express.static(path.join(__dirname, 'public')))

  //Flash
  app.use(flash());

  app.use((req, res, next) => {

    res.locals.erro_login = req.flash("error");
    res.locals.success_message = req.flash("success_message");
    res.locals.error_message = req.flash("error_message");
    res.locals.user = req.user || null
    next()

  })

  app.use(
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    fileUpload({debug: false}),
    user,
    auth
  );
};

export default Routes;