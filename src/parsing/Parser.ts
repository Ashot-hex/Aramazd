import { Statement } from "../ast/ast";
import { BlockStmt } from "../ast/statements";
import { Lexer } from "../lexer/Lexer";
import { Token } from "../lexer/Token";
import { TokenKind } from "../lexer/TokenKind";
import { parse_stmt } from "./stmt";

export class Parser {
    public static Parse(tokens: Token[]): BlockStmt {
        const parser = new Parser(tokens);
        const body: Statement[] = [];

        while (parser.hasTokens()) {
            try {
                body.push(parse_stmt(parser));
            } catch (err) {
                console.error(err);
                throw new SyntaxError()
            }
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
    public expect(expected: TokenKind): Token {
        if (this.currentTokenKind !== expected) {
            throw new Error(`Unexpected error at ${JSON.stringify(this.currentPosition(), null, 2)}, got ${this.currentTokenKind.toString()}, expected ${expected.toString()}`);
        }

        return this.advance();
    }
    private currentPosition(): { line: number, col: number } {
        return {
            line: this.currentToken.Line,
            col: this.currentToken.Col,
        };
    }
}