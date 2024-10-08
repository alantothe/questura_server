import db from "./mongo/connection"
import express from "express"
import routes from "./routes/index"
import passport from 'passport';
import session from 'express-session';
import { configureGoogleAuth, setupGoogleStrategy } from './controllers/auth';
import User from './models/User';


const app = express()
const PORT = 4000

app.use(express.json());

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Google Strategy
setupGoogleStrategy();

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

app.use("/api", routes)


db.on("connected", () => {
    console.clear();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express server running on PORT: ${PORT}`);
    });
  });
  
