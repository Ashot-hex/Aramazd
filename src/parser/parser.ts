import { Stmt } from "../ast/ast";
import { BlockStmt } from "../ast/stmt";
import { Lexer } from "../lexer/Lexer";
import { Token, TokenKind } from "../lexer/Token";
import { createTokenLookups } from "./lookups";
import { parse_stmt } from "./stmt";

export class Parser {
    public static Parse(source: string): BlockStmt {
        createTokenLookups();
        const tokens = Lexer.Tokenize(source);
        const parser = new Parser(tokens);
        const body: Stmt[] = [];

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

    public assertCurrentTokenKingIs(expected: TokenKind): Token {
        if (this.currentTokenKind !== expected) {
            throw new Error(`Unexpected error, got ${this.currentTokenKind}, expected ${expected}`);
        }

        return this.advance();
    }
}