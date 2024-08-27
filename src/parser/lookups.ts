import { Expr, Stmt } from "../ast/ast";
import { TokenKind } from "../lexer/Token";
import { parse_primary_expr } from "./expr";
import { Parser } from "./parser";
import { parse_binary_expr, parse_var_decl_stmt } from "./stmt";

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

function nud(kind: TokenKind, bp: BindingPower, nud_fn: nud_handler) {
    bpLookpup.set(kind, BindingPower.PRIMARY);
    nudLookpup.set(kind, nud_fn);
}

function stmt(kind: TokenKind, stmt_fn: stmt_handler) {
    bpLookpup.set(kind, BindingPower.DEFAULT);
    stmtLookpup.set(kind, stmt_fn);
}

export function createTokenLookups(): void {

    // Additive & Multiplicitave
    led(TokenKind.ADDITION, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.SUBSTRACTION, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.DIVISION, BindingPower.MULTIPLICATIVE, parse_binary_expr)
    led(TokenKind.MULTIPLICATION, BindingPower.MULTIPLICATIVE, parse_binary_expr)

    // Literals & Symbols
    nud(TokenKind.NUMBER, BindingPower.PRIMARY, parse_primary_expr)
    nud(TokenKind.STRING, BindingPower.PRIMARY, parse_primary_expr)
    nud(TokenKind.IDENTIFIER, BindingPower.PRIMARY, parse_primary_expr)

    //Statements
    stmt(TokenKind.CONST, parse_var_decl_stmt);
    stmt(TokenKind.LET, parse_var_decl_stmt);
}