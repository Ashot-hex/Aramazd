import { type } from "os";
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

	public parse(): BlockStmt {
		const body: Stmt[] = [];

		while (this.hasTokens()) {
			try {
				body.push(parse_stmt(this));
			} catch (err) {
				console.error(err);
				throw new SyntaxError();
			}
		}

		return {
			body,
		};
	}

	// HELPER METHODS
	currentToken(): Token {
		return this.tokens[this.pos];
	}

	currentTokenKind(): TokenType {
		return this.currentToken().type;
	}

	advance(): Token {
		const tk = this.currentToken();
		this.pos++;
		return tk;
	}

	hasTokens(): boolean {
		return this.pos < this.tokens.length && this.currentTokenKind() != TokenType.EOF;
	}

	expect(expected: TokenType): Token {
		if (expected != this.currentTokenKind()) {
			throw `Expected %s but recieved ${type.name} instead.`;
		}

		return this.advance();
	}
}
