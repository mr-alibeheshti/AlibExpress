import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { Request } from "./Request";
import { Response } from "./Response";
import { Middleware, Methods } from "./types";
import { Logger } from "./logger";
import { bodyParser } from "./bodyParser";

export class AlibExpress {
  private middlewares: Middleware[] = [];
  private routes: Methods = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };

  constructor(private isDev: boolean = false) {
    if (isDev) {
      this.use(Logger);
    }
    this.use(bodyParser);
  }

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  private registerRoute(
    method: keyof Methods,
    path: string,
    handlers: Middleware[],
  ): void {
    if (!this.routes[method][path]) {
      this.routes[method][path] = [];
    }
    this.routes[method][path].push(...handlers);
  }

  get(path: string, ...handlers: Middleware[]): void {
    this.registerRoute("GET", path, handlers);
  }

  post(path: string, ...handlers: Middleware[]): void {
    this.registerRoute("POST", path, handlers);
  }

  put(path: string, ...handlers: Middleware[]): void {
    this.registerRoute("PUT", path, handlers);
  }

  delete(path: string, ...handlers: Middleware[]): void {
    this.registerRoute("DELETE", path, handlers);
  }

  listen(port: number, callback?: () => void): void {
    const server = createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        const { method, url } = req;
        if (!method || !url) {
          res.statusCode = 400;
          res.end("Bad Request: Method or URL missing");
          return;
        }

        const parsedUrl = parse(url, true);
        const request = new Request(req, parsedUrl.query);
        const response = new Response(res);

        const routeHandlers =
          this.routes[method as keyof Methods]?.[parsedUrl.pathname ?? ""] ||
          [];
        const middlewares = [...this.middlewares, ...routeHandlers];

        let i = 0;
        const next = async (err?: any) => {
          if (err) {
            response.send("Internal Server Error", 500);
            return;
          }
          if (i < middlewares.length) {
            const middleware = middlewares[i++];
            try {
              await new Promise<void>((resolve, reject) => {
                middleware(request, response, (error) =>
                  error ? reject(error) : resolve(),
                );
              });
              next();
            } catch (error) {
              next(error);
            }
          } else {
            response.send("Not Found", 404);
          }
        };

        next();
      },
    );

    server.listen(port, callback);
  }
}

const alibexpress = (isDev: boolean = false) => new AlibExpress(isDev);
export default alibexpress;
