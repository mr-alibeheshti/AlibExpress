import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';

export class Request {
  public query: ParsedUrlQuery;
  public method: string | undefined;
  public url: string | undefined;
  public body: any;

  constructor(private req: IncomingMessage, query: ParsedUrlQuery) {
    this.query = query;
    this.method = req.method;
    this.url = req.url;
    this.body = null;
  }

  get headers() {
    return this.req.headers;
  }
  
}
