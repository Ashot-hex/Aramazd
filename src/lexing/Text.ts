export class Text {
	public constructor(private _remaining: string) {
		this._remaining = _remaining.trim();
	}

	public get remaining(): string {
		return this._remaining;
	}

	public get atEOF(): boolean {
		return this.remaining.length === 0;
	}

	public advance(n: number = 1): void {
		if (!this.atEOF) {
			this._remaining = this._remaining.slice(n).trim();
		}
	}
}
