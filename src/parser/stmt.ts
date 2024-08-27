import { Expr, Stmt } from "../ast/ast";
import { AssignementExpr, BinaryExpr, PrefixExpr } from "../ast/expr";
import { ExpressionStmt, VarDeclarationStmt } from "../ast/stmt";
import { TokenKind } from "../lexer/Token";
import { parse_expr } from "./expr";
import { BindingPower, bpLookpup, stmtLookpup } from "./lookups";
import { Parser } from "./parser";

export function parse_stmt(p: Parser): Stmt {
    const stmt_fn = stmtLookpup.get(p.currentTokenKind);

    if (stmt_fn) {
        return stmt_fn(p);
    }

    return parse_expression_stmt(p);
}

function parse_expression_stmt(p: Parser): ExpressionStmt {
    const expr = parse_expr(p, BindingPower.DEFAULT);
    p.assertCurrentTokenKingIs(TokenKind.SEMI_COLON);

    return new ExpressionStmt(expr);
}

export function parse_binary_expr(p: Parser, left: Expr, bp: BindingPower): Expr {
    const operatorToken = p.advance()
    const right = parse_expr(p, bp)

    return new BinaryExpr(
        left,
        operatorToken,
        right,
    );
}

export function parse_prefix_expr(p: Parser): Expr {
    const operator = p.advance();
    const rhs = parse_expr(p, BindingPower.DEFAULT);

    return new PrefixExpr(operator, rhs);
}
export function parse_assignement_expr(p: Parser, left: Expr, bp: BindingPower): Expr {
    const operator = p.advance();
    const rhs = parse_expr(p, bp);

    return new AssignementExpr(left, operator, rhs);
}

export function parse_var_decl_stmt(p: Parser): Stmt {
    const isConst = p.advance().Kind === TokenKind.CONST;
    const varname = p.assertCurrentTokenKingIs(TokenKind.IDENTIFIER).Value;
    p.assertCurrentTokenKingIs(TokenKind.ASSIGNMENT);
    const assignedValue = parse_expr(p, BindingPower.ASSIGNMENT);
    p.assertCurrentTokenKingIs(TokenKind.SEMI_COLON);


    return new VarDeclarationStmt(
        varname,
        isConst,
        assignedValue,
    );
}