import {
    BindingPower,
    BpLookup,
    LedLookup,
    NudLookup,
} from "../model/BindingPower";
import { TokenType } from "../model/TokenType";
import {
    BinaryExpr,
    Expr,
    NumberExpr,
    StringExpr,
    SymbolExpr
} from "../model/ast/Expressions";
import Parser from "./Parser";

export function parse_expr(p: Parser, bp: BindingPower): Expr {
  const tokenKind = p.currentTokenKind;
  const nud_fn = NudLookup.get(tokenKind);

  if (!nud_fn) {
    throw new Error("NUD Handler expected for token " + tokenKind);
  }

  let left = nud_fn(p);
  while (BpLookup.get(p.currentTokenKind)! > bp) {
    const tokenKind = p.currentTokenKind;
    const led_fn = LedLookup.get(tokenKind);

    if (!led_fn) {
      throw new Error("LED Handler expected for token " + tokenKind);
    }

    left = led_fn(p, left, BpLookup.get(p.currentTokenKind)!);
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
      throw (
        "Cannot create primary_expression from " + p.currentTokenKind().name
      );
  }
}

export function parse_binary_expr(
  p: Parser,
  left: Expr,
  bp: BindingPower
): Expr {
  const operator = p.advance();
  const right = parse_expr(p, bp);

  return {
    left,
    operator,
    right,
  } as BinaryExpr;
}
