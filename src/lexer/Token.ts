import { TokenKind, TokenKindUtil } from "./TokenKind";

export class Token {
    public constructor(
        private kind: TokenKind,
        private value: string
    ) { }

    public get Kind() { return this.kind; }
    public get Value() { return this.value; }

    public toString(): string {
        const kindName = TokenKindUtil.toString(this.Kind);
        return `${kindName} (${this.Value})`;
    }
}