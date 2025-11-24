import {
    parse_operation_expr,
    parse_primary_expr,
    parse_symbol
} from "../pasring/Expression";
import {
    parse_class_stmt,
    parse_getter_stmt,
    parse_namespace_stmt,
    parse_setter_stmt,
    parse_using_stmt,
    parse_var_decl_stmt,
    parse_visibility_stmt
} from "../pasring/Statement";
import { Expr, Stmt } from "./Ast";
import { BindingPower } from "./BindingPower";
import { TokenType } from "./TokenType";

type StmtHandler = () => Stmt;
type NudHandler = () => Expr;
type LedHandler = (left: Expr, bp: BindingPower) => Expr;

const StmtLookup = new Map<TokenType, StmtHandler>();
const NudLookup = new Map<TokenType, NudHandler>();
const LedLookup = new Map<TokenType, LedHandler>();
const BpLookup = new Map<TokenType, BindingPower>();

function led(kind: TokenType, bp: BindingPower, led_fn: LedHandler) {
  BpLookup.set(kind, bp);
  LedLookup.set(kind, led_fn);
}

function nud(kind: TokenType, nud_fn: NudHandler) {
  BpLookup.set(kind, BindingPower.Primary);
  NudLookup.set(kind, nud_fn);
}

function stmt(kind: TokenType, stmt_fn: StmtHandler) {
  BpLookup.set(kind, BindingPower.Default);
  StmtLookup.set(kind, stmt_fn);
}

export function createTokenLookups() {
  StmtLookup.clear();
  NudLookup.clear();
  LedLookup.clear();
  BpLookup.clear();

  led(TokenType.Member, BindingPower.Member, parse_operation_expr);
  led(TokenType.Plus, BindingPower.Additive, parse_operation_expr);
  led(TokenType.Star, BindingPower.Multiplicative, parse_operation_expr);
  led(TokenType.Assignement, BindingPower.Assignment, parse_operation_expr);

  nud(TokenType.String, parse_primary_expr);
  nud(TokenType.Number, parse_primary_expr);
  nud(TokenType.Symbol, parse_primary_expr);

  stmt(TokenType.Symbol, parse_symbol);
  stmt(TokenType.Using, parse_using_stmt);
  stmt(TokenType.Namespace, parse_namespace_stmt);
  stmt(TokenType.Class, parse_class_stmt);
  stmt(TokenType.Public, parse_visibility_stmt);
  stmt(TokenType.Private, parse_visibility_stmt);
  stmt(TokenType.Const, parse_var_decl_stmt);
  stmt(TokenType.Readonly, parse_var_decl_stmt);
  stmt(TokenType.Static, parse_var_decl_stmt);
  stmt(TokenType.Get, parse_getter_stmt);
  stmt(TokenType.Set, parse_setter_stmt);
}

export { BpLookup, LedLookup, NudLookup, StmtLookup };
