import { Expr, Stmt } from "../ast/ast";
import { TokenKind } from "../lexer/Token";
import { parse_grouping_expr, parse_primary_expr } from "./expr";
import { Parser } from "./parser";
import { parse_assignement_expr, parse_binary_expr, parse_prefix_expr, parse_var_decl_stmt } from "./stmt";

export enum BindingPower {
    DEFAULT,
    COMMA,
    ASSIGNMENT,
    LOGICAL,
    RELATIONAL,
    ADDITIVE,
    MULTIPLICATIVE,
    UNARY,
    CALL,
    MEMBER,
    PRIMARY,
}

type stmt_handler = (p: Parser) => Stmt;
type nud_handler = (p: Parser) => Expr;
type led_handler = (p: Parser, left: Expr, bp: BindingPower) => Expr;

export const stmtLookpup: Map<TokenKind, stmt_handler> = new Map();
export const nudLookpup: Map<TokenKind, nud_handler> = new Map();
export const ledLookpup: Map<TokenKind, led_handler> = new Map();
export const bpLookpup: Map<TokenKind, BindingPower> = new Map();


function led(kind: TokenKind, bp: BindingPower, led_fn: led_handler) {
    bpLookpup.set(kind, bp);
    ledLookpup.set(kind, led_fn);
}

function nud(kind: TokenKind, nud_fn: nud_handler) {
    nudLookpup.set(kind, nud_fn);
}

function stmt(kind: TokenKind, stmt_fn: stmt_handler) {
    bpLookpup.set(kind, BindingPower.DEFAULT);
    stmtLookpup.set(kind, stmt_fn);
}

export function createTokenLookups(): void {
    // // Assignement
    // led(TokenKind.ASSIGNMENT, BindingPower.ASSIGNMENT, parse_assignement_expr);
    // led(TokenKind.PLUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignement_expr);
    // led(TokenKind.MINUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignement_expr);

    // // Additive & Multiplicitave
    // led(TokenKind.ADDITION, BindingPower.ADDITIVE, parse_binary_expr);
    // led(TokenKind.SUBSTRACTION, BindingPower.ADDITIVE, parse_binary_expr);
    // led(TokenKind.DIVISION, BindingPower.MULTIPLICATIVE, parse_binary_expr);
    // led(TokenKind.MULTIPLICATION, BindingPower.MULTIPLICATIVE, parse_binary_expr);

    // // Literals & Symbols
    // nud(TokenKind.NUMBER, parse_primary_expr);
    // nud(TokenKind.STRING, parse_primary_expr);
    // nud(TokenKind.IDENTIFIER, parse_primary_expr);
    // nud(TokenKind.OPEN_PAREN, parse_grouping_expr);
    // nud(TokenKind.SUBSTRACTION, parse_prefix_expr);

    // //Statements
    // stmt(TokenKind.CONST, parse_var_decl_stmt);
    // stmt(TokenKind.LET, parse_var_decl_stmt);
    led(TokenKind.ASSIGNMENT, BindingPower.ASSIGNMENT, parse_assignement_expr)
    led(TokenKind.PLUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignement_expr)
    led(TokenKind.MINUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignement_expr)

    // Logical
    led(TokenKind.AND, BindingPower.LOGICAL, parse_binary_expr)
    led(TokenKind.OR, BindingPower.LOGICAL, parse_binary_expr)
    // led(TokenKind.DOT_DOT, logical, parse_binary_expr)

    // Relational
    led(TokenKind.LESS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.LESS_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.GREATER, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.GREATER_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.NOT_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)

    // Additive & Multiplicative
    led(TokenKind.PLUS, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.DASH, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.STAR, BindingPower.MULTIPLICATIVE, parse_binary_expr)
    led(TokenKind.SLASH, BindingPower.MULTIPLICATIVE, parse_binary_expr)
    // led(TokenKind.PERCENT, multiplicative, parse_binary_expr)

    // Literals & Symbols
    nud(TokenKind.NUMBER, parse_primary_expr)
    nud(TokenKind.STRING, parse_primary_expr)
    nud(TokenKind.IDENTIFIER, parse_primary_expr)
    nud(TokenKind.OPEN_PAREN, parse_grouping_expr)
    nud(TokenKind.DASH, parse_prefix_expr)

    // Statements

    stmt(TokenKind.CONST, parse_var_decl_stmt)
    stmt(TokenKind.LET, parse_var_decl_stmt)
}