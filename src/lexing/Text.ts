import { Pos } from "./Pos";

export class Text {
  private _remaining: string;

  public constructor(private _content: string) {
    this._remaining = _content.trim();
  }

  public get _consumed(): string {
    const cursor = this._content.length - this.remaining.length;
    return this._content.substring(0, cursor);
  }
  public get remaining(): string {
    return this._remaining;
  }

  public get pos(): Pos {
    const col = (this._consumed.split(/[\r\n]/gm)?.at(-1)?.length ?? 0) + 1;
    const ln = (this._consumed.match(/[\r\n]/gm)?.length ?? 0) - 1;

    return {
      col,
      line: ln,
    };
  }

  public get atEOF(): boolean {
    return this.remaining.length === 0;
  }

  public advance(n: number = 1): void {
    if (this.atEOF) {
      return;
    }

    this._remaining = this._remaining.substring(n).trim();
  }
}
