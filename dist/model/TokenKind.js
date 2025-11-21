"use strict";
// //Gotta rename some for their actual name (semi colon != end of statement in every language)
// export class TokenKind extends String {
// 	static readonly EOF = new TokenKind();
// 	static readonly IDENTIFIER = new TokenKind();
Object.defineProperty(exports, "__esModule", { value: true });
//     public readonly name: string;
// 	private constructor() {
//         super();
//         this.name = TokenKindRecord[this as keyof typeof TokenKind];
//     }
// }
// const TokenKindRecord: Record<TokenKind, string> = Object
//     .keys(TokenKind)
//     .filter(k => isNaN(Number(k)))
//     .reduce((acc, key) => {
//         acc[TokenKind?.[key]] = key;
//         return acc;
//     }, {} as any);
// const RESERVED_KEYWORDS: TokenKind[] = [];
//# sourceMappingURL=TokenKind.js.map