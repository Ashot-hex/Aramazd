export class TokenKind {
    static readonly EOF = new TokenKind();
    static readonly LITERAL = new TokenKind();
    static readonly IDENTIFIER = new TokenKind();
    static readonly SYMBOL = new TokenKind();
    static readonly KEYWORD = new TokenKind();
    static readonly OPERATOR = new TokenKind();
    
    static readonly OPEN_PAREN = new TokenKind();
    static readonly CLOSE_PAREN = new TokenKind();
    
    static readonly OPEN_BRACE = new TokenKind();
    static readonly CLOSE_BRACE = new TokenKind();
    
    static readonly OPEN_BRACKET = new TokenKind();
    static readonly CLOSE_BRACKET = new TokenKind();
    
    static readonly SEMICOLON = new TokenKind();
    static readonly COMMA = new TokenKind();
    static readonly DOT = new TokenKind();
    static readonly LINE_COMMENT = new TokenKind();

    static readonly QUESTION = new TokenKind();
    static readonly COLON = new TokenKind();

    

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


const RESERVED_KEYWORDS: string[] = [
    "package",
    "import",
    "class",
    "private",
    "public",
    "static",
    "final",
    "implements",
    "class",
    "return",
]

// Dict of the keyword's name (string) to itself
export const RESERVED_KEYWORDS_LOOKUP: Set<string> = new Set(RESERVED_KEYWORDS)

// To force the init of the name of each TokenKind
for (const o of Object.values(TokenKind)) { o.toString() }