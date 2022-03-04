const css = (color: string) => ["color: " + color].join(";");

export class Logger {
  constructor(private _color: string, private _source: string) {}

  info = (message: string) => {
    console.log("%c[" + this._source + "] " + message, css(this._color));
  };

  error = (message: string) => {
    console.error("%c[" + this._source + "] " + message, css(this._color));
  };
}
