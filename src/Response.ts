import { ServerResponse } from "http";

export class Response {
  private defaultStatusCode: number = 200;

  constructor(public res: ServerResponse) {}

  end(data?: any): void {
    this.res.end(data);
  }

  json(data: any, statusCode?: number): void {
    this.res.statusCode = statusCode ?? this.defaultStatusCode;
    this.res.setHeader("Content-Type", "application/json");
    this.res.end(JSON.stringify(data));
  }

  redirect(url: string, statusCode: number = 302): void {
    this.res.statusCode = statusCode;
    this.res.setHeader("Location", url);
    this.res.end();
  }

  status(code: number): this {
    this.res.statusCode = code;
    return this;
  }

  setHeader(name: string, value: string): this {
    this.res.setHeader(name, value);
    return this;
  }

  send(data: any, statusCode?: number): void {
    this.res.statusCode = statusCode ?? this.defaultStatusCode;

    if (typeof data === "object") {
      this.res.setHeader("Content-Type", "application/json");
      this.res.end(JSON.stringify(data));
    } else {
      this.res.end(data);
    }
  }

  get statusCode(): number {
    return this.res.statusCode;
  }

  on(event: string, listener: () => void): void {
    this.res.on(event, listener);
  }
}
