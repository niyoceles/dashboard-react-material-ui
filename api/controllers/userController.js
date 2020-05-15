import models from '../models';
import Auth from '../helpers/Auth';
import client from '../helpers/redis';

const {
  users
} = models;

class userController {
  static async signIn(req, res) {
    const {
      email, password
    } = req.body;
    if (!email) {
      return res.status(400).json({
        error: 'email is required',
      });
    }
    if (!password) {
      return res.status(400).json({
        error: 'password is required',
      });
    }
    try {
      const checkUser = await users.findOne({
        where: {
          email,
        },
      });

      if (!checkUser) {
        return res.status(404).json({
          error: 'user not found'
        });
      }

      const compared = Auth.comparePassword(password, checkUser.password);
      if (!compared) {
        return res.status(404).json({
          error: 'Email and Password are not match',
        });
      }

      return res.status(200).json({
        User: {
          email,
          username: checkUser.username,
          token: Auth.generateToken(checkUser.id, email, checkUser.username),
        },
        message: 'successful sign in',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to sign in'
      });
    }
  }

  static async signout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await client.set(token, 'Blacklisted'); // Blacklist the token and store it in redis
      return res.status(200).json({
        message: 'successfully signed out',
      });
    } catch (error) {
      res.status(500).json({
        error: 'failed to signout',
      });
    }
  }
}

export default userController;
