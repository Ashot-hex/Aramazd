import { BlockStmt, Stmt } from "../model/ast/Statements";
import { createTokenLookups } from "../model/BindingPower";
import Token from "../model/Token";
import { TokenType } from "../model/TokenType";
import { parse_stmt } from "./Stmt";

export default class Parser {
	private pos: number = 0;
	constructor(private tokens: Token[]) {
		createTokenLookups();
	}

	parse(): BlockStmt {
		const body: Stmt[] = [];

		while (this.hasTokens()) {
			body.push(body, parse_stmt(this));
		}

		return {
			body,
		};
	}


    // HELPER METHODS
    currentToken(): Token {
        return this.tokens[this.pos]
    }

    currentTokenKind(): TokenKind {
        return this.currentToken().Kind
    }

    advance(): Token {
        const tk = this.currentToken()
        this.pos++
        return tk
    }

    hasTokens(): boolean {
        return this.pos < this.tokens.length && this.currentTokenKind() != TokenType.EOF
    }

    expectError(expected: TokenType, err: any): Token {
        const token = this.currentToken()
        const type = token.type

        if (type != expected) {
            if (!err) {
                err = `Expected %s but recieved ${type.name} instead.`
            }

            panic(err)
        }

        return this.advance()
    }

    expect(expectedKind TokenKind): Token {
        return this.expectError(expectedKind, nil)
    }

}
