import { TokenKind } from "./TokenKind";

export class Token {
    public constructor(
        private kind: TokenKind,
        private value: string,
        private line: number,
        private col: number,
    ) { }

    public get Kind() { return this.kind; }
    public get Value() { return this.value; }
    public get Line() { return this.line; }
    public get Col() { return this.col; }

    public toString(): string {
        return `${this.Kind} (${this.Value})`;
    }

    public isOneOfMany(...kinds: TokenKind[]): boolean {
        return kinds.includes(this.kind);
    }

    public simplify() {
        return {
            kind: this.kind.toString(),
            value: this.value,
        }
    }
}