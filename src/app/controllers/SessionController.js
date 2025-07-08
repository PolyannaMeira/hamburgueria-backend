import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authConfig from '../../config/auth.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPassworIncorrect = () =>
      response
        .status(401)
        .json({ error: 'Make sure your email or password are correct' });
    if (!isValid) {
      return emailOrPassworIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return emailOrPassworIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);

    if (!isSamePassword) {
      return emailOrPassworIncorrect();
    }

    return response.status(201).json({ 
        id: user.id,
        name: user.name,
        email,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name:user.name }, authConfig.secret, { expiresIn: authConfig.expireIn }),
 
    });
  }
}

export default new SessionController();
