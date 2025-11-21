import { ExpressionStmt, Stmt } from "../model/ast/Statements";
import { BindingPower, StmtLookup } from "../model/BindingPower";
import { TokenType } from "../model/TokenType";
import { parse_expr } from "./Expr";
import Parser from "./Parser";

export function parse_stmt(p: Parser): Stmt {
	const stmt_fn = StmtLookup.get(p.currentTokenKind());

	if (stmt_fn) {
		return stmt_fn(p);
	}

	const expression = parse_expr(p, BindingPower.Default);
	p.expect(TokenType.Semi);

	return {
		expression,
	} as ExpressionStmt;
}
