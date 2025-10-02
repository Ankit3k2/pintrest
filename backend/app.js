import createError from 'http-errors';
import express from 'express';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import expressSession from 'express-session';
import passport from 'passport';

import indexRouter from './controllers/index.js';
//import usersRouter from './routes/user.js';   // <-- keep routes separate
import User from './models/user.js';           // <-- import User model

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/pintrest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// CORS (allow frontend)
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

// Session & Passport setup
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "pint"
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());   // from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
//app.use('/users', usersRouter);

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 APP IS LISTENING ON http://localhost:${PORT}`);
});

export default app;
