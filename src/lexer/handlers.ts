import { Lexer } from "./Lexer";
import { Token } from "./Token";
import { TokenKind, RESERVED_KEYWORDS_LOOKUP } from "./TokenKind";

export const RegexHandler = (lex: Lexer, regex: RegExp): void => { };

export const Handlers = {
    defaultHandler,
    commentHandler,
    stringHandler,
    numberHandler,
    skipHandler,
    symbolHandler,
}

//#region handlers
function defaultHandler(kind: TokenKind, value: string): typeof RegexHandler {
    return (l: Lexer, regex: RegExp) => {
        l.advanceN(value.length);
        l.push(new Token(kind, value))
    }
}

function commentHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.COMMENT, match[0]))
    }
}

function stringHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.STRING, match[0]))
    }
}
function numberHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(new Token(TokenKind.NUMBER, match[0]))
    }
}

function skipHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    l.advanceN(match?.length ?? 0);
}

function symbolHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        const value = match[0];

        const kind = RESERVED_KEYWORDS_LOOKUP[value] ?? TokenKind.IDENTIFIER;
        l.push(new Token(kind, value))

        l.advanceN(value.length);
    }
}
//#endregion handlers