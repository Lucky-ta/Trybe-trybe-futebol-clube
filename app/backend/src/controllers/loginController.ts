import { Response, Request } from 'express';
import { userLogin } from '../services/loginService';
import { validateLogin } from '../services/loginService';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { result, status } = await userLogin(email, password);
    return res.status(status).json(result.message || result);
  } catch (e: any) {
    return res.status(404).json(e.message);
  }
};

const validate = async (req: Request, res: Response) => {
  try {
    const { authorization: token } = req.headers;
    const result = validateLogin(token || '');
    return res.status(result.status).json(result.data)
  } catch (e: any) {
    return res.status(500).json(e.message)
  }
}

export default login;
