import { Statement, Expression } from "../ast/ast";
import { BinaryExpr, PrefixExpr, AssignementExpr, NumberExpr, StringExpr, SymbolExpr } from "../ast/expressions";
import { ExpressionStmt, VarDeclarationStmt } from "../ast/statements";
import { TokenKind, TokenKindUtil } from "../lexer/TokenKind";
import { BindingPower } from "./BindingPower";
import { STMT_LOOKUP, NUD_LOOKUP, BP_LOOKUP, LED_LOOKUP } from "./lookups";
import { Parser } from "./Parser";

export function parse_stmt(p: Parser): Statement {
    const stmt_fn = STMT_LOOKUP.get(p.currentTokenKind);

    if (stmt_fn) {
        return stmt_fn(p);
    }

    return parse_expression_stmt(p);
}

function parse_expression_stmt(p: Parser): ExpressionStmt {
    const expr = parse_expr(p, BindingPower.DEFAULT);
    p.assertCurrentTokenKindIs(TokenKind.SEMI_COLON);

    return new ExpressionStmt(expr);
}

export function parse_binary_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    const operatorToken = p.advance()
    const right = parse_expr(p, bp)

    return new BinaryExpr(
        left,
        operatorToken,
        right,
    );
}

export function parse_prefix_expr(p: Parser): Expression {
    const operator = p.advance();
    const rhs = parse_expr(p, BindingPower.DEFAULT);

    return new PrefixExpr(operator, rhs);
}
export function parse_assignement_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    const operator = p.advance();
    const rhs = parse_expr(p, bp);

    return new AssignementExpr(left, operator, rhs);
}

export function parse_var_decl_stmt(p: Parser): Statement {
    const isConst = p.advance().Kind === TokenKind.CONST;
    const varname = p.assertCurrentTokenKindIs(TokenKind.IDENTIFIER).Value;
    p.assertCurrentTokenKindIs(TokenKind.ASSIGNMENT);
    const assignedValue = parse_expr(p, BindingPower.ASSIGNMENT);
    p.assertCurrentTokenKindIs(TokenKind.SEMI_COLON);


    return new VarDeclarationStmt(
        varname,
        isConst,
        assignedValue,
    );
}
export function parse_expr(p: Parser, bp: BindingPower): Expression {
    const tokenKind = p.currentTokenKind
    const nud_fn = NUD_LOOKUP.get(tokenKind);

    if (!nud_fn) {
        throw new Error("NUD Handler expected for token " + TokenKindUtil.toString(tokenKind));
    }

    let left = nud_fn(p)
    while (BP_LOOKUP.get(p.currentTokenKind)! > bp) {
        const tokenKind = p.currentTokenKind
        const led_fn = LED_LOOKUP.get(tokenKind);

        if (!led_fn) {
            throw new Error("LED Handler expected for token " + TokenKindUtil.toString(tokenKind));
        }

        left = led_fn(p, left, BP_LOOKUP.get(p.currentTokenKind)!)
    }

    return left
}

export function parse_grouping_expr(p: Parser): Expression {
    p.advance();
    const expr = parse_expr(p, BindingPower.DEFAULT);
    p.assertCurrentTokenKindIs(TokenKind.CLOSE_PAREN);
    return expr;
}

export function parse_primary_expr(p: Parser): Expression {
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
