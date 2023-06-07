/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request } from 'express';

import User, { IUser } from '../models/user.model';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import passport, { Profile } from 'passport';
import { type JwtPayload } from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions, type VerifiedCallback } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import * as dotenv from 'dotenv';
dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY ?? 'secret',
};

export const configurePassport = (passport: passport.PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        callbackURL: `${process.env.BACKEND_URL ?? ''}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async function (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifiedCallback,
      ) {
        const email = profile.emails?.[0]?.value;

        if (email == null) {
          // Handle the case when email is undefined
          done(new Error('Email not found'), false);
          return;
        }
        try {
          let user = await User.findOne({ email });

          if (user == null) {
            // User does not exist, create a new user
            user = new User({
              username: profile.displayName,
              email,
              googleId: profile.id,
              password: null,
              provider: 'google',
            });

            user = await user.save();
          }

          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          return done(null, user);
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );

  passport.use(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new JwtStrategy(opts, async function (jwtPayload: JwtPayload, done) {
      try {
        const user = await User.findOne({ email: 'basilaslam@gmail.com' });

        if (user != null) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    }),
  );
};
