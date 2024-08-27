import { RegexHandler, skipHandler, numberHandler, stringHandler, defaultHandler, commentHandler, symbolHandler } from "./handlers";
import { Token, TokenKind } from "./Token"


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

        lexer.push(new Token(TokenKind.EOF, "EOF"));

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
    push(token: Token): void {
        this.tokens.push(token);
    }
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
            handler: defaultHandler(kind, value)
        };
    }

    const patterns: RegexPattern[] = [
        { regex: /^\s+/, handler: skipHandler },
        { regex: /^\.\d+/, handler: numberHandler },
        { regex: /^\d+\.\d+/, handler: numberHandler },
        { regex: /^\d+/, handler: numberHandler },
        { regex: /^"[^"]*"/, handler: stringHandler },
        { regex: /^'[^']*'/, handler: stringHandler },
        { regex: /^\/\/.*/, handler: commentHandler },
        { regex: /^[\w_][\w\d_]*/, handler: symbolHandler },

        createPattern(TokenKind.ADDITION, '+'),
        createPattern(TokenKind.SUBSTRACTION, '-'),
        createPattern(TokenKind.DIVISION, '/'),
        createPattern(TokenKind.MULTIPLICATION, '*'),

        createPattern(TokenKind.OPEN_BRACKET, '['),
        createPattern(TokenKind.CLOSE_BRACKET, ']'),
        createPattern(TokenKind.OPEN_CURLY, '{'),
        createPattern(TokenKind.CLOSE_CURLY, '}'),
        createPattern(TokenKind.OPEN_PAREN, '('),
        createPattern(TokenKind.CLOSE_PAREN, ')'),

        createPattern(TokenKind.LAMBDA_OPERATOR, '=>'),

        createPattern(TokenKind.EQUALS, '=='),
        createPattern(TokenKind.ASSIGNMENT, '='),
        createPattern(TokenKind.NOT_EQUALS, '!='),
        createPattern(TokenKind.NOT, '!'),

        createPattern(TokenKind.LESS, '<'),
        createPattern(TokenKind.LESS_EQUALS, '<='),
        createPattern(TokenKind.GREATER, '>'),
        createPattern(TokenKind.GREATER_EQUALS, '>='),

        createPattern(TokenKind.OR, '&&'),
        createPattern(TokenKind.AND, '||'),

        createPattern(TokenKind.MEMBER_OPERATOR, '.'),
        createPattern(TokenKind.SEMI_COLON, ';'),
        createPattern(TokenKind.COLON, ':'),
        createPattern(TokenKind.COALESCENCE, '??'),
        createPattern(TokenKind.QUESTION, '?'),
        createPattern(TokenKind.COMMA, ','),

        createPattern(TokenKind.PLUS_PLUS, '++'),
        createPattern(TokenKind.MINUS_MINUS, '--'),
        createPattern(TokenKind.PLUS_EQUALS, '+='),
        createPattern(TokenKind.MINUS_EQUALS, '-='),
        createPattern(TokenKind.NULLISH_ASSIGNMENT, '??='),

        createPattern(TokenKind.NULL, 'null'),
        createPattern(TokenKind.TRUE, 'true'),
        createPattern(TokenKind.FALSE, 'false'),
    ];

    console.debug("Every TokenKind has a matching pattern :", Object.keys(TokenKind).length == patterns.length);

    return new Lexer(patterns, source);
}
