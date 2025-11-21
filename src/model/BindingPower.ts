import Parser from "../pasring/Parser";
import { Expr } from "./ast/Expressions";
import { Stmt } from "./ast/Statements";
import { TokenType } from "./TokenType";

export enum BindingPower {
	Default = 0,
	Comma = 1,
	Assignment = 2,
	Logical = 3,
	Relational = 4,
	Additive = 5,
	Multiplicative = 6,
	Unary = 7,
	Call = 8,
	Member = 9,
	Primary = 10,
}

type stmt_handler = (p: Parser) => Stmt;
type nud_handler = (p: Parser) => Expr;
type led_handler = (p: Parser, left: Expr, bp: BindingPower) => Expr;

export const StmtLookup = new Map<TokenType, stmt_handler>();
export const NudLookup = new Map<TokenType, nud_handler>();
export const LedLookup = new Map<TokenType, led_handler>();
export const BpLookup = new Map<TokenType, BindingPower>();

function led(kind: TokenType, bp: BindingPower, led_fn: led_handler) {
	BpLookup.set(kind, bp);
	LedLookup.set(kind, led_fn);
}

function nud(kind: TokenType, bp: BindingPower, nud_fn: nud_handler) {
	BpLookup.set(kind, BindingPower.Primary);
	NudLookup.set(kind, nud_fn);
}

function stmt(kind: TokenType, stmt_fn: stmt_handler) {
	BpLookup.set(kind, BindingPower.Default);
	StmtLookup.set(kind, stmt_fn);
}

const parse_binary_expr = null!;
const parse_primary_expr = null!;

export function createTokenLookups() {
	// Logical
	led(TokenType.And, BindingPower.Logical, parse_binary_expr);
	led(TokenType.Or, BindingPower.Logical, parse_binary_expr);
	led(TokenType.DotDot, BindingPower.Logical, parse_binary_expr);

	// Relational
	led(TokenType.LessThan, BindingPower.Relational, parse_binary_expr);
	led(TokenType.LessOrEquals, BindingPower.Relational, parse_binary_expr);
	led(TokenType.GreaterThan, BindingPower.Relational, parse_binary_expr);
	led(TokenType.GreaterOrEquals, BindingPower.Relational, parse_binary_expr);
	led(TokenType.Equals, BindingPower.Relational, parse_binary_expr);
	led(TokenType.NotEquals, BindingPower.Relational, parse_binary_expr);

	// Additive & Multiplicative
	led(TokenType.Plus, BindingPower.Additive, parse_binary_expr);
	led(TokenType.Dash, BindingPower.Additive, parse_binary_expr);

	led(TokenType.Star, BindingPower.Multiplicative, parse_binary_expr);
	led(TokenType.Slash, BindingPower.Multiplicative, parse_binary_expr);
	led(TokenType.Percent, BindingPower.Multiplicative, parse_binary_expr);

	// Literals & Symbols
	nud(TokenType.Number, BindingPower.Primary, parse_primary_expr);
	nud(TokenType.Number, BindingPower.Primary, parse_primary_expr);
	nud(TokenType.String, BindingPower.Primary, parse_primary_expr);
	nud(TokenType.Symbol, BindingPower.Primary, parse_primary_expr);
}
