import passport from 'passport';
import session from 'express-session';
import express from 'express';
import User from '../models/User';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

//create passport 
export const setupGoogleStrategy = () => {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:4000/api/user/auth/google/callback",
      scope: ['profile', 'email', 'openid']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0].value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }));
  };
  export const configureGoogleAuth = (app: express.Application) => {
    app.use(session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
  
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser(async (id: string, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }