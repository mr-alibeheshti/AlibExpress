import { Middleware } from './types';
import { Request } from './Request';
import { Response } from './Response';

export const bodyParser: Middleware = (req: Request, res: Response, next: (err?: any) => void) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';

    (req as any).req.on('data', (chunk: Buffer) => { 
      body += chunk.toString(); 
    });

    (req as any).req.on('end', () => {
      try {
        req.body = JSON.parse(body); 
      } catch (e) {
        req.body = body; 
      }
      next();
    });
  } else {
    next();
  }
};
