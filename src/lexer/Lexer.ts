import { RegexHandler, Handlers } from "./handlers";
import { Token } from "./Token"
import { TokenKind } from "./TokenKind";


type RegexPattern = {
    regex: RegExp,
    handler: typeof RegexHandler,
}

export class Lexer {
    public static Tokenize(source: string): Token[] {
        const lexer = createLexer(source);

        while (!lexer.atEof()) {
            let matched = false;
            const remainder = lexer.remainder();
            for (const pattern of lexer.Patterns) {
                const match = remainder.match(pattern.regex);

                if (match?.index === 0) {
                    pattern.handler(lexer, pattern.regex);
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                throw new Error(`No matches found : "${remainder.slice(0, 30)}"`);
            }
        }

        // lexer.push(new Token(TokenKind.EOF, "EOF", lexer.currentLine(), source.split('\n').at(-1)?.length ?? 0));
        lexer.push(TokenKind.EOF, "EOF");

        return lexer.Tokens;
    }

    public constructor(
        private patterns: RegexPattern[],
        private source: string,
        private tokens: Token[] = [],
        private pos: number = 0,
    ) { }

    public get Tokens() { return this.tokens; }
    public get Patterns() { return this.patterns; }


    advanceN(n: number): void {
        this.pos += n;
    }
    push(kind: TokenKind, value: string): void {
        const split = this.source.slice(0, this.pos).split('\n');
        const line = split.length;
        const col = split.at(-1)?.length ?? 0;

        const token = new Token(
            kind,
            value,
            line,
            col
        );

        this.Tokens.push(token);
    }
    // push(token: Token): void {
    // this.tokens.push(token);
    // }
    remainder(): string {
        return this.source.slice(this.pos);
    }
    atEof(): boolean {
        return this.pos >= this.source.length;
    }
}

//TODO: Better if it was extracted to another file
//TODO: Either fix up the main loop to push only the longest matching token, or sort the pattern list by length for those with default handlers
function createLexer(source: string): Lexer {
    const createPattern = (kind: TokenKind, value: string) => {
        const str = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp("^" + str)

        return {
            regex: regex,
            handler: Handlers.defaultHandler(kind, value)
        };
    }

    const patterns: RegexPattern[] = [
        // Symbol length n
        { regex: /^\s+/, handler: Handlers.skipHandler },
        { regex: /^\.\d+/, handler: Handlers.numberHandler },
        { regex: /^\d+\.\d+/, handler: Handlers.numberHandler },
        { regex: /^\d+/, handler: Handlers.numberHandler },
        { regex: /^"[^"]*"/, handler: Handlers.stringHandler },
        { regex: /^'[^']*'/, handler: Handlers.stringHandler },
        { regex: /^\/\/.*/, handler: Handlers.commentHandler },
        { regex: /^[\w_][\w\d_]*/, handler: Handlers.symbolHandler },

        // Symbol length 3
        createPattern(TokenKind.NULLISH_ASSIGNMENT, "??="),

        // Symbol length 2
        createPattern(TokenKind.EQUALS, "=="),
        createPattern(TokenKind.NOT_EQUALS, "!="),
        createPattern(TokenKind.LESS_EQUALS, "<="),
        createPattern(TokenKind.GREATER_EQUALS, ">="),
        createPattern(TokenKind.OR, "||"),
        createPattern(TokenKind.AND, "&&"),
        createPattern(TokenKind.DOT_DOT, ".."),
        createPattern(TokenKind.PLUS_PLUS, "++"),
        createPattern(TokenKind.MINUS_MINUS, "--"),
        createPattern(TokenKind.PLUS_EQUALS, "+="),
        createPattern(TokenKind.MINUS_EQUALS, "-="),

        // Symbol length 1
        createPattern(TokenKind.OPEN_BRACKET, "["),
        createPattern(TokenKind.CLOSE_BRACKET, "]"),
        createPattern(TokenKind.OPEN_CURLY, "{"),
        createPattern(TokenKind.CLOSE_CURLY, "}"),
        createPattern(TokenKind.OPEN_PAREN, "("),
        createPattern(TokenKind.CLOSE_PAREN, ")"),

        createPattern(TokenKind.ASSIGNMENT, "="),
        createPattern(TokenKind.NOT, "!"),
        createPattern(TokenKind.LESS, "<"),
        createPattern(TokenKind.GREATER, ">"),
        createPattern(TokenKind.DOT, "."),
        createPattern(TokenKind.SEMI_COLON, ";"),
        createPattern(TokenKind.COLON, ":"),
        createPattern(TokenKind.QUESTION, "?"),
        createPattern(TokenKind.COMMA, ","),
        createPattern(TokenKind.PLUS, "+"),
        createPattern(TokenKind.DASH, "-"),
        createPattern(TokenKind.SLASH, "/"),
        createPattern(TokenKind.STAR, "*"),
        createPattern(TokenKind.PERCENT, "%"),
    ];

    return new Lexer(patterns, source);
}
