import { Expression, Statement } from "../ast/ast";
import { TokenKind } from "../lexer/TokenKind";
import { BindingPower } from "./BindingPower";
import { parse_binary_expr, parse_primary_expr, parse_prefix_expr, parse_grouping_expr, parse_array_literal_expr, parse_call_expr, parse_fn_expr, parse_member_expr, parse_assignment_expr, parse_range_expr } from "./expr";
import { Parser } from "./Parser";
import { parse_block_stmt, parse_class_declaration_stmt, parse_class_instanciation_expr, parse_fn_declaration, parse_foreach_stmt, parse_if_stmt, parse_import_stmt, parse_var_decl_stmt } from "./stmt";

type stmt_handler = (p: Parser) => Statement;
type nud_handler = (p: Parser) => Expression;
type led_handler = (p: Parser, left: Expression, bp: BindingPower) => Expression;

export const STMT_LOOKUP: Map<TokenKind, stmt_handler> = new Map();
export const NUD_LOOKUP: Map<TokenKind, nud_handler> = new Map();
export const LED_LOOKUP: Map<TokenKind, led_handler> = new Map();
export const BP_LOOKUP: Map<TokenKind, BindingPower> = new Map();


function led(kind: TokenKind, bp: BindingPower, led_fn: led_handler) {
    BP_LOOKUP.set(kind, bp);
    LED_LOOKUP.set(kind, led_fn);
}

function nud(kind: TokenKind, nud_fn: nud_handler) {
    NUD_LOOKUP.set(kind, nud_fn);
}

function stmt(kind: TokenKind, stmt_fn: stmt_handler) {
    BP_LOOKUP.set(kind, BindingPower.DEFAULT);
    STMT_LOOKUP.set(kind, stmt_fn);
}

//Is automatically called right bellow
function createTokenLookups(): void {
    //#region LED
    // Assignment
    led(TokenKind.ASSIGNMENT, BindingPower.ASSIGNMENT, parse_assignment_expr)
    led(TokenKind.PLUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignment_expr)
    led(TokenKind.MINUS_EQUALS, BindingPower.ASSIGNMENT, parse_assignment_expr)

    // Logical
    led(TokenKind.AND, BindingPower.LOGICAL, parse_binary_expr)
    led(TokenKind.OR, BindingPower.LOGICAL, parse_binary_expr)
    led(TokenKind.DOT_DOT, BindingPower.LOGICAL, parse_range_expr)

    // Relational
    led(TokenKind.LESS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.LESS_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.GREATER, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.GREATER_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.EQUALS, BindingPower.RELATIONAL, parse_binary_expr)
    led(TokenKind.NOT_EQUALS, BindingPower.RELATIONAL, parse_binary_expr)

    // Additive & Multiplicitave
    led(TokenKind.PLUS, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.DASH, BindingPower.ADDITIVE, parse_binary_expr)
    led(TokenKind.SLASH, BindingPower.MULTIPLICATIVE, parse_binary_expr)
    led(TokenKind.STAR, BindingPower.MULTIPLICATIVE, parse_binary_expr)
    led(TokenKind.PERCENT, BindingPower.MULTIPLICATIVE, parse_binary_expr)

    // Member / Computed // Call
    led(TokenKind.DOT, BindingPower.MEMBER, parse_member_expr)
    led(TokenKind.OPEN_BRACKET, BindingPower.MEMBER, parse_member_expr)
    led(TokenKind.OPEN_PAREN, BindingPower.CALL, parse_call_expr)
    //#endregion LED

    //#region NUD
    // Literals & Symbols
    nud(TokenKind.NUMBER, parse_primary_expr)
    nud(TokenKind.STRING, parse_primary_expr)
    nud(TokenKind.IDENTIFIER, parse_primary_expr)

    // Unary/Prefix
    nud(TokenKind.TYPEOF, parse_prefix_expr)
    nud(TokenKind.DASH, parse_prefix_expr)
    nud(TokenKind.NOT, parse_prefix_expr)
    nud(TokenKind.OPEN_BRACKET, parse_array_literal_expr)

    // Grouping Expr
    nud(TokenKind.OPEN_PAREN, parse_grouping_expr)
    nud(TokenKind.FN, parse_fn_expr)
    nud(TokenKind.NEW, parse_class_instanciation_expr);
    //#endregion NUD

    //#region Stmt
    stmt(TokenKind.OPEN_CURLY, parse_block_stmt)
    stmt(TokenKind.LET, parse_var_decl_stmt)
    stmt(TokenKind.CONST, parse_var_decl_stmt)
    stmt(TokenKind.FN, parse_fn_declaration)
    stmt(TokenKind.IF, parse_if_stmt)
    stmt(TokenKind.IMPORT, parse_import_stmt)
    stmt(TokenKind.FOREACH, parse_foreach_stmt)
    stmt(TokenKind.CLASS, parse_class_declaration_stmt)
    //#endregion Stmt
}
createTokenLookups();