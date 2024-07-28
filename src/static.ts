import { Request } from './Request';
import { Response } from './Response';
import { createReadStream, stat } from 'fs';
import { join } from 'path';
import { Middleware } from './types';

export const serveStatic = (root: string): Middleware => {
  return (req: Request, res: Response, next: () => void) => {
    const filePath = req.url ? join(root, req.url) : null;

    if (!filePath) {
      next();
      return;
    }

    stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        next();
        return;
      }

      const readStream = createReadStream(filePath);

      readStream.on('open', () => {
        readStream.pipe(res.res);
      });

      readStream.on('error', (err) => {
        console.error('File read error:', err);
        res.status(404).send('File not found');
      });
    });
  };
};
