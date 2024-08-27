import { Expr } from "../ast/ast"
import { NumberExpr, StringExpr, SymbolExpr } from "../ast/expr"
import { TokenKind, TokenKindUtil } from "../lexer/Token"
import { BindingPower, bpLookpup, ledLookpup, nudLookpup } from "./lookups"
import { Parser } from "./parser"

export function parse_expr(p: Parser, bp: BindingPower): Expr {
    const tokenKind = p.currentTokenKind
    const nud_fn = nudLookpup.get(tokenKind);

    if (!nud_fn) {
        throw new Error("NUD Handler expected for token " + TokenKindUtil.toString(tokenKind));
    }

    let left = nud_fn(p)
    while (bpLookpup.get(p.currentTokenKind)! > bp) {
        const tokenKind = p.currentTokenKind
        const led_fn = ledLookpup.get(tokenKind);

        if (!led_fn) {
            throw new Error("LED Handler expected for token " + TokenKindUtil.toString(tokenKind));
        }

        left = led_fn(p, left, bpLookpup.get(p.currentTokenKind)!)
    }

    return left
}

export function parse_grouping_expr(p: Parser): Expr {
    p.advance();
    const expr = parse_expr(p, BindingPower.DEFAULT);
    p.assertCurrentTokenKingIs(TokenKind.CLOSE_PAREN);
    return expr;
}

export function parse_primary_expr(p: Parser): Expr {
    switch (p.currentTokenKind) {
        case TokenKind.NUMBER:
            return new NumberExpr(Number(p.advance().Value))
        case TokenKind.STRING:
            return new StringExpr(p.advance().Value);
        case TokenKind.IDENTIFIER:
            return new SymbolExpr(p.advance().Value);
        default:
            throw new Error("Cannot create primary_expr from " + p.currentTokenKind);
    }
}
