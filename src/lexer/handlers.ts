import { Lexer } from "./Lexer";
import { RESERVED_KEYWORDS_LOOKUP, TokenKind } from "./TokenKind";

export const RegexHandler = (lex: Lexer, regex: RegExp): void => { };

export const Handlers = {
    defaultHandler,
    commentHandler,
    literalHandler,
    skipHandler,
    symbolHandler,
}

//#region handlers
function defaultHandler(kind: TokenKind, value: string): typeof RegexHandler {
    return (l: Lexer, regex: RegExp) => {
        l.advanceN(value.length);
        l.push(kind, value);
    }
}

function commentHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
    }
}

function literalHandler(l: Lexer, regex: RegExp): void {
    const match = l.remainder().match(regex);
    if (match) {
        l.advanceN(match[0].length);
        l.push(TokenKind.LITERAL, match[0]);
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

        const kind = RESERVED_KEYWORDS_LOOKUP.has(value)
            ? TokenKind.IDENTIFIER
            : TokenKind.SYMBOL;
            
        l.push(kind, value)

        l.advanceN(value.length);
    }
}
//#endregion handlers