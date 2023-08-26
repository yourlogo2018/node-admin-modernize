import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../firebase/config.js';

const authenticateUser = (email, password, done) => {
    let usersRef = db.collection('users');
    let query = usersRef.where('email', '==', email).limit(1);
    query.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Erro no login');
                return done(null, false, { message: 'Invalid Login / Password' });
            }

            snapshot.forEach(doc => {
                let user = doc.data();
                user.id = doc.id;
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log('Erro na senha', err);
                        return done(err);
                    }

                    if (isMatch) {
                        console.log('A senha fornecida corresponde à senha hash');
                        return done(null, user);
                    } else {
                        console.log('A senha fornecida não corresponde à senha hash');
                        return done(null, false, { message: 'Invalid Login / Password' });
                    }
                });
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
            return done(err);
        });
};

const serializeUser = (user, done) => {
    done(null, user);
};

const deserializeUser = (user, done) => {
    let userRef = db.collection('users').doc(user.id);
    userRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such user!');
                return done(null, false, { message: 'No such user.' });
            } else {
                return done(null, doc.data());
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return done(err);
        });
};

export default function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'pass' }, authenticateUser));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
};
