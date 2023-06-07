import User, { type IUser } from '../models/user.model';
import { type Request, type Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
export const isAuthorized = async (req: Request, res: Response): Promise<void> => {
  res.json({ isValid: true });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  console.log(email, password, username);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser != null) {
      res.status(400).json({ message: 'User already exists' });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: encryptedPassword, username, provider: 'email' });

    await user.save();
    res.status(200).json({ msg: 'User Registered Successfully' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user != null) {
      const compareResult = await bcrypt.compare(password, user?.password);

      if (compareResult) {
        const payload = {
          username: user.username,
          email: user.email,
          id: user._id,
        };
        const secretOrPrivateKey = process.env.PRIVAT_KEY ?? 'secret';
        const token = jwt.sign(payload, secretOrPrivateKey);

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        res.status(200).json({ msg: 'Login successfull', token: `Bearer ${token}` });
      } else {
        res.status(400).json({ msg: 'Password does not match' });
      }
    } else {
      res.status(404).json({ msg: 'No user found' });
    }
  } catch (error) {
    console.log('enter in catch');
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const googleAuthSuccess = (req: Request, res: Response) => {
  const user = req.user as IUser;
  const payload = {
    username: user.username,
    email: user.email,
    id: user.googleId,
  };
  const secretOrPrivateKey = process.env.PRIVAT_KEY ?? 'secret';
  const token = jwt.sign(payload, secretOrPrivateKey);

  res.redirect(`${process.env.FRONTEND_URL ?? ''}/OAuthRedirecting?token=${token}`);
};
