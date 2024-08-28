import { Statement } from "../ast/ast";
import { BlockStmt } from "../ast/statements";
import { Lexer } from "../lexer/Lexer";
import { Token } from "../lexer/Token";
import { TokenKind } from "../lexer/TokenKind";
import { parse_stmt } from "./parsing_utils";

export class Parser {
    public static Parse(source: string): BlockStmt {
        const tokens = Lexer.Tokenize(source);
        const parser = new Parser(tokens);
        const body: Statement[] = [];

        while (parser.hasTokens()) {
            body.push(parse_stmt(parser));
        }

        return new BlockStmt(body);
    }


    public constructor(
        private tokens: Token[],
        private pos: number = 0,
    ) { }

    public get currentToken(): Token {
        return this.tokens[this.pos];
    }
    public get currentTokenKind(): TokenKind {
        return this.currentToken.Kind
    }

    public advance(): Token {
        const token = this.currentToken;
        this.pos++;
        return token;
    }
    public hasTokens(): boolean {
        return this.pos < this.tokens.length && this.currentTokenKind !== TokenKind.EOF;
    }
    public assertCurrentTokenKindIs(expected: TokenKind): Token {
        if (this.currentTokenKind !== expected) {
            throw new Error(`Unexpected error, got ${this.currentTokenKind}, expected ${expected}`);
        }

        return this.advance();
    }
}