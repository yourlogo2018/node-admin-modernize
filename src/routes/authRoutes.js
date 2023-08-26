// routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import eAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', eAdmin, (req, res) => {

  const count = 2;
  res.render('admin/index', {count})
  console.log(`Dados do usuario logado: ${JSON.stringify(req.user, null, 2)}`);

})

router.get('/login', (req, res) => {
  res.render('admin/login')
});

router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
      console.log('Authentication callback');
      console.log('err:', err);
      console.log('user:', user);
      console.log('info:', info);
      if (err) { return next(err); }
      if (!user) { 
          req.flash('error', info.message);
          return res.redirect('/login'); 
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
  })(req, res, next);

});

router.get('/logout', (req, res) => {
  req.logout((err) => {
      if (err) { 
          return next(err); 
      }
      res.redirect('/login');
  });

})

export default router;
