import { Handlers, RegexHandler } from "./handlers";
import { Token } from "./Token";
import { TokenKind } from "./TokenKind";

type RegexPattern = {
  regex: RegExp;
  handler: typeof RegexHandler;
};

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
        throw new Error(`No matches found : "${remainder.slice(0, 30)}..."`);
      }
    }

    lexer.push(TokenKind.EOF, "EOF");

    return lexer.Tokens;
  }

  public constructor(
    private patterns: RegexPattern[],
    private source: string,
    private tokens: Token[] = [],
    private pos: number = 0
  ) {}

  public get Tokens() {
    return this.tokens;
  }
  public get Patterns() {
    return this.patterns;
  }

  advanceN(n: number): void {
    this.pos += n;
  }
  push(kind: TokenKind, value: string): void {
    const split = this.source.slice(0, this.pos).split("\n");
    const line = split.length;
    const col = split.at(-1)?.length ?? 0;

    const token = new Token(kind, value, line, col);

    this.Tokens.push(token);
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
    const str = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp("^" + str);

    return {
      regex: regex,
      handler: Handlers.defaultHandler(kind, value),
    };
  };

  const patterns: RegexPattern[] = [
    // Symbol length n
    { regex: /^\s+/, handler: Handlers.skipHandler },
    { regex: /^\.\d+/, handler: Handlers.literalHandler },
    { regex: /^\d+\.\d+/, handler: Handlers.literalHandler },
    { regex: /^\d+/, handler: Handlers.literalHandler },
    { regex: /^"[^"]*"/, handler: Handlers.literalHandler },
    { regex: /^'[^']*'/, handler: Handlers.literalHandler },
    { regex: /^\/\/.*/, handler: Handlers.commentHandler },
    { regex: /^\/\*\*[\s\S]*?\*\//, handler: Handlers.commentHandler },
    { regex: /^[\w_][\w\d_]*/, handler: Handlers.symbolHandler },
    { regex: /^@[\w_][\w\d_]*/, handler: Handlers.symbolHandler },

    createPattern(TokenKind.OPEN_BRACE, "["),
    createPattern(TokenKind.CLOSE_BRACE, "]"),
    createPattern(TokenKind.OPEN_BRACKET, "{"),
    createPattern(TokenKind.CLOSE_BRACKET, "}"),
    createPattern(TokenKind.OPEN_PAREN, "("),
    createPattern(TokenKind.CLOSE_PAREN, ")"),

    createPattern(TokenKind.SEMICOLON, ";"),
    createPattern(TokenKind.COMMA, ","),
    createPattern(TokenKind.DOT, "."),
    createPattern(TokenKind.LINE_COMMENT, "//"),

    createPattern(TokenKind.OPERATOR, "+"),
    createPattern(TokenKind.OPERATOR, "*"),
    createPattern(TokenKind.OPERATOR, "-"),
    createPattern(TokenKind.OPERATOR, "/"),
    createPattern(TokenKind.OPERATOR, "=="),
    createPattern(TokenKind.OPERATOR, "!="),
    createPattern(TokenKind.OPERATOR, "!"),

    createPattern(TokenKind.OPERATOR, "="),

    createPattern(TokenKind.QUESTION, "?"),
    createPattern(TokenKind.COLON, ":"),
  ];

  return new Lexer(patterns, source);
}
