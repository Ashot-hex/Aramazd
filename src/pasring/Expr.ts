import { BindingPower, BpLookup, LedLookup, NudLookup } from "../model/BindingPower";
import { TokenType } from "../model/TokenType";
import { BinaryExpr, Expr, NumberExpr, StringExpr, SymbolExpr } from "../model/ast/Expressions";
import Parser from "./Parser";

export function parse_expr(p: Parser, bp: BindingPower): Expr {
	// First parse the NUD
	let tokenKind = p.currentTokenKind();
	const nud_fn = NudLookup.get(tokenKind);

	if (!nud_fn) {
		throw "NUD HANDLER EXPECTED FOR TOKEN " + tokenKind.name;
	}

	let left = nud_fn(p);
	while (bp < BpLookup.get(p.currentTokenKind())!) {
		tokenKind = p.currentTokenKind();
		const led_fn = LedLookup.get(tokenKind);

		if (!led_fn) {
			throw "LED HANDLER EXPECTED FOR TOKEN " + tokenKind.name;
		}

		left = led_fn(p, left, bp);
	}

	return left;
}

export function parse_primary_expr(p: Parser): Expr {
	switch (p.currentTokenKind()) {
		case TokenType.Number:
			const number = Number(p.advance().value);
			return {
				value: number,
			} as NumberExpr;

		case TokenType.String:
			return {
				value: p.advance().value,
			} as StringExpr;

		case TokenType.Symbol:
			return {
				value: p.advance().value,
			} as SymbolExpr;

		default:
			throw "Cannot create primary_expression from " + p.currentTokenKind().name;
	}
}

export function parse_binary_expr(p: Parser, left: Expr, bp: BindingPower): Expr {
	const operator = p.advance();
	const right = parse_expr(p, bp);

	return {
		left,
		operator,
		right,
	} as BinaryExpr;
}
