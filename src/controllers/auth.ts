import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateUserDto } from "../types/dto/CreateUser.dto";
import { LoginUserDto } from "../types/dto/LoginUser.dto";
import { Request, Response } from "express";

dotenv.config();

let TOKEN_KEY = process.env.TOKEN_KEY;

const fiveHoursInSeconds = 5 * 60 * 60;
// for JWT expiration
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const register = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  console.log('check body:', req.body);
  const { firstName, lastName, email, password } = req.body;
  let user;
  try {
    // check if user already exists
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const payload = {
      _id: savedUser._id,
      exp: Math.floor(Date.now() / 1000) + fiveHoursInSeconds, 
    };

    const token = jwt.sign(payload, TOKEN_KEY as string);


    if (Error instanceof Error) {
      return res.status(400).json({ error: Error.message });
    }

    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + fiveHoursInSeconds,
      };

      const token = jwt.sign(payload, TOKEN_KEY as string);
      res.status(201).json({ token });
    } else {
      res.status(401).json({
        error: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//js->ts
// export const resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   if (!token || !password) {
//     return res.status(400).json({ error: "Token and password are required" });
//   }

//   let payload;
//   try {
//     payload = jwt.verify(token, TOKEN_KEY);
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid or expired token" });
//   }

//   const user = await User.findById(payload._id);

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   user.password = hashedPassword;
//   await user.save();

//   res.status(200).json({ message: "Password reset successfully" });
// };
