import { Middleware } from './types';
import { Request } from './Request';
import { Response } from './Response';

export const bodyParser: Middleware = async (req: Request, res: Response, next: (err?: any) => void) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body;
    try {
      body = await getBody(req);
      req.body = JSON.parse(body);
    } catch (e) {
      req.body = body;
    }
  }
  next();
};

function getBody(req: Request): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';

    (req as any).req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    (req as any).req.on('end', () => {
      resolve(body);
    });

    (req as any).req.on('error', (err: any) => {
      reject(err);
    });
  });
}
