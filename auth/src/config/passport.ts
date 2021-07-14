import passport from 'passport';
import { User, UserDoc } from '../model/user.model';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);

type User = {
  _id?: number;
};

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser(User.deserializeUser());
