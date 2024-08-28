export class TokenKindUtil {
    public static toString(tk: TokenKind): string {
        const obj = TokenKind as object;
        return (Object.keys(obj).find(key => obj[key as keyof typeof obj] === tk) as string).toLowerCase();
    }
}

//Gotta rename some for their actual name (semi colon != end of statement in every language)
export enum TokenKind {
    EOF,
    NULL,
    TRUE,
    FALSE,
    NUMBER,
    STRING,
    COMMENT,
    IDENTIFIER,
    LAMBDA_OPERATOR,

    // Grouping & Braces
    OPEN_BRACKET,
    CLOSE_BRACKET,
    OPEN_CURLY,
    CLOSE_CURLY,
    OPEN_PAREN,
    CLOSE_PAREN,

    // Equivilance
    ASSIGNMENT,
    EQUALS,
    NOT_EQUALS,
    NOT,

    // Conditional
    LESS,
    LESS_EQUALS,
    GREATER,
    GREATER_EQUALS,

    // Logical
    OR,
    AND,

    // Symbols
    MEMBER_OPERATOR,
    SEMI_COLON,
    COLON,
    QUESTION,
    COALESCENCE,
    COMMA,

    // Shorthand
    PLUS_PLUS,
    MINUS_MINUS,
    PLUS_EQUALS,
    MINUS_EQUALS,
    NULLISH_ASSIGNMENT,

    //Maths
    PLUS,
    DASH,
    SLASH,
    STAR,

    //Keywords
    LET,
    CONST,
    CLASS,
    NEW,
    IMPORT,
    FROM,
    FN,
    IF,
    ELSE,
    FOREACH,
    WHILE,
    FOR,
    EXPORT,
    TYPEOF,
    IN,
}

const RESERVED_KEYWORDS = [
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
    TokenKind.IN
]

//Dict of the keyword's name (string) to itself
export const RESERVED_KEYWORDS_LOOKUP: { [key: string]: TokenKind } = RESERVED_KEYWORDS.reduce((acc, curr) => {
    const key = TokenKindUtil.toString(curr);
    acc[key] = curr;
    return acc;
}, {} as { [key: string]: TokenKind });