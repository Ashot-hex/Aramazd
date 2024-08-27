import { Lexer } from "./Lexer";
import { TokenKind, Token, RESERVED_KEYWORDS_LOOKUP } from "./Token";

export const RegexHandler = (lex: Lexer, regex: RegExp): void => { };

export function defaultHandler(kind: TokenKind, value: string): typeof RegexHandler {
    return (l: Lexer, regex: RegExp) => {
        l.advanceN(value.length);
        l.push(new Token(kind, value))
    }
}

export function commentHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.COMMENT, match[0]))
    }
}

export function stringHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.STRING, match[0]))
    }
}

export function numberHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.NUMBER, match[0]))
    }
}

export function skipHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    l.advanceN(match?.length ?? 0);
}

export function symbolHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        const value = match[0];

        const kind = RESERVED_KEYWORDS_LOOKUP[value] ?? TokenKind.IDENTIFIER;
        l.push(new Token(kind, value))

        l.advanceN(value.length);
    }
}
