import {Router, RequestHandler} from "express"
import { allUsers, createUser, findUserById } from "../controllers/user"
import { login, register } from "../controllers/auth"
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router()

router.post("/auth/register", register as RequestHandler);
router.post("/auth/login", login as RequestHandler);

// Google Auth routes
router.get('/auth/google',
  passport.authenticate('google', { 
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid'
    ]
  })
);
  
  router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const user = req.user as any;
      const payload = {
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + 5 * 60 * 60, // 5 hours
      };
      const token = jwt.sign(payload, process.env.TOKEN_KEY as string);
      res.json({ token });
    });

export default router;
