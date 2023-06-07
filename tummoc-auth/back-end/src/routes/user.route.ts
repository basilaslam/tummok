/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import * as userController from '../controllers/user.controller';
import passport from 'passport';
import { configurePassport } from '../utils/passport';
const router = express.Router();
// Initialize Passport

configurePassport(passport);
router.route('/isAuthorized').get(userController.isAuthorized);
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));
router
  .route('/auth/google/callback')
  .get(passport.authenticate('google', { session: false }), userController.googleAuthSuccess);
export default router;
