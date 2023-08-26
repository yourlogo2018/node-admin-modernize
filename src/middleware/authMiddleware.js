// authMiddleware.js
const eAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error_message", "Usuário não autorizado");
        res.redirect('/login');
    }
}

export default eAdmin;
