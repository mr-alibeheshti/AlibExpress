import { Middleware } from './types';
import { Request } from './Request';
import { Response } from './Response';

type ValidationRules = {
  name?: boolean;
  email?: boolean;
  phone?: boolean
};

export const Validator = (rules: ValidationRules): Middleware => {
  return async (req: Request, res: Response, next: (err?: any) => void) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      const { name, email,phone } = req.body;
      if (rules.name) {
        if (!name || name.trim().length === 0) {
          return res.status(400).json({ error: 'Name is required' });
        }
      }

      if (rules.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email address' });
        }
      }

      if (rules.phone) {
        if (!phone) {
          return res.status(400).json({ error: 'Phone is required ' });
        }
      }
    }
    next();
  };
};
