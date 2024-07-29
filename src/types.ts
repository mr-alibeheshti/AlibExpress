import { Request } from './Request';
import { Response } from './Response';

export type Middleware = (req: Request, res: Response, next: (err?: any) => void) => void;

export interface Methods {
  [method: string]: Record<string, Middleware[]>;
}
