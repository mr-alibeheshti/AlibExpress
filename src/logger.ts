import { Middleware } from './types';
import { Request } from './Request';
import { Response } from './Response';

export const requestLogger: Middleware = (req: Request, res: Response, next: (err?: any) => void) => {
  const startTime = process.hrtime();

  const logRequest = () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const milliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    console.log(`${req.method} ${req.url} ${res.statusCode} ${milliseconds}ms`);
  };

  res.on('finish', logRequest);
  res.on('close', logRequest);

  next();
};