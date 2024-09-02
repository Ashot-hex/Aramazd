//Gotta rename some for their actual name (semi colon != end of statement in every language)
export class TokenKind {
    static readonly EOF = new TokenKind();
    static readonly NULL = new TokenKind();
    static readonly TRUE = new TokenKind();
    static readonly FALSE = new TokenKind();
    static readonly NUMBER = new TokenKind();
    static readonly STRING = new TokenKind();
    static readonly IDENTIFIER = new TokenKind();
    static readonly OPEN_BRACKET = new TokenKind();
    static readonly CLOSE_BRACKET = new TokenKind();
    static readonly OPEN_CURLY = new TokenKind();
    static readonly CLOSE_CURLY = new TokenKind();
    static readonly OPEN_PAREN = new TokenKind();
    static readonly CLOSE_PAREN = new TokenKind();
    static readonly ASSIGNMENT = new TokenKind();
    static readonly EQUALS = new TokenKind();
    static readonly NOT_EQUALS = new TokenKind();
    static readonly NOT = new TokenKind();
    static readonly LESS = new TokenKind();
    static readonly LESS_EQUALS = new TokenKind();
    static readonly GREATER = new TokenKind();
    static readonly GREATER_EQUALS = new TokenKind();
    static readonly OR = new TokenKind();
    static readonly AND = new TokenKind();
    static readonly DOT = new TokenKind();
    static readonly DOT_DOT = new TokenKind();
    static readonly SEMI_COLON = new TokenKind();
    static readonly COLON = new TokenKind();
    static readonly QUESTION = new TokenKind();
    static readonly COMMA = new TokenKind();
    static readonly PLUS_PLUS = new TokenKind();
    static readonly MINUS_MINUS = new TokenKind();
    static readonly PLUS_EQUALS = new TokenKind();
    static readonly MINUS_EQUALS = new TokenKind();
    static readonly NULLISH_ASSIGNMENT = new TokenKind();
    static readonly PLUS = new TokenKind();
    static readonly DASH = new TokenKind();
    static readonly SLASH = new TokenKind();
    static readonly STAR = new TokenKind();
    static readonly PERCENT = new TokenKind();
    static readonly LET = new TokenKind();
    static readonly CONST = new TokenKind();
    static readonly CLASS = new TokenKind();
    static readonly NEW = new TokenKind();
    static readonly IMPORT = new TokenKind();
    static readonly FROM = new TokenKind();
    static readonly FN = new TokenKind();
    static readonly IF = new TokenKind();
    static readonly ELSE = new TokenKind();
    static readonly FOREACH = new TokenKind();
    static readonly WHILE = new TokenKind();
    static readonly FOR = new TokenKind();
    static readonly EXPORT = new TokenKind();
    static readonly TYPEOF = new TokenKind();
    static readonly IN = new TokenKind();
    static readonly NUM_TOKENS = new TokenKind();

    private name?: string;
    private constructor() {
    }
    private findName(): string {
        const entry = Object.entries(TokenKind).find(([key, value]) => value === this)?.[0];
        return (entry ?? 'Unknown') as string;
    }
    public toString(): string {
        this.name ??= this.findName();
        return this.name;
    }
}


const RESERVED_KEYWORDS: TokenKind[] = [
    TokenKind.TRUE,
    TokenKind.FALSE,
    TokenKind.NULL,
    TokenKind.LET,
    TokenKind.CONST,
    TokenKind.CLASS,
    TokenKind.NEW,
    TokenKind.IMPORT,
    TokenKind.FROM,
    TokenKind.FN,
    TokenKind.IF,
    TokenKind.ELSE,
    TokenKind.FOREACH,
    TokenKind.WHILE,
    TokenKind.FOR,
    TokenKind.EXPORT,
    TokenKind.TYPEOF,
    TokenKind.IN,
]

// Dict of the keyword's name (string) to itself
export const RESERVED_KEYWORDS_LOOKUP: { [key: string]: TokenKind } = RESERVED_KEYWORDS.reduce(
    (
        acc: { [key: string]: TokenKind },
        curr: TokenKind
    ) => {
        const key = curr.toString().toLowerCase();
        acc[key] = curr;

        return acc;
    }, {});

// To force the init of the name of each TokenKind
for (const o of Object.values(TokenKind)) { o.toString() }