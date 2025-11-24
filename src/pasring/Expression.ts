import { Expr, Stmt } from "../model/Ast";
import { BindingPower } from "../model/BindingPower";
import { BpLookup, LedLookup, NudLookup } from "../model/Lookups";
import { ReservedKeywords, TokenType } from "../model/TokenType";
import { parser } from "./Parser";
import {
    parse_field_stmt,
    parse_function_call_stmt,
    parse_function_stmt,
    parse_property_stmt,
    parse_stmt,
} from "./Statement";

export function parse_expr(bp: BindingPower): Expr {
  const nud_fn = NudLookup.get(parser.currentTokenType);

  if (!nud_fn) {
    throw new Error("Expected NUD Handler");
  }

  let left = nud_fn();
  while (BpLookup.get(parser.currentTokenType)! > bp) {
    const led_fn = LedLookup.get(parser.currentTokenType);

    if (!led_fn) {
      throw new Error("Expected LED Handler");
    }

    left = led_fn(left, BpLookup.get(parser.currentTokenType)!);
  }

  return left;
}

export function parse_primary_expr(): Expr {
  const curr = parser.advance();

  return {
    type: curr.type.name,
    value: curr.value,
  };
}

export function parse_operation_expr(left: Expr, bp: BindingPower): Expr {
  const { value, type } = parser.advance();
  const operator = { value, type: type.name };
  const right = parse_stmt();

  return {
    type: "Operation",
    left,
    operator,
    right,
  };
}

export function parse_reassignement_expr(): Expr {
  const assigne = parse_expr(BindingPower.Default);
  return parse_assignement_expr(assigne, BindingPower.Default);
}

export function parse_assignement_expr(left: Expr, bp: BindingPower): Expr {
  parser.expect(TokenType.Assignement);
  const value = parse_expr(BindingPower.Assignment);

  parser.expect(TokenType.Semi);
  return {
    type: "Assignement",
    assigne: left,
    value,
  };
}

export function parse_symbol(): Stmt {
  if (ReservedKeywords.includes(parser.currentTokenType)) {
    return parse_stmt();
  }

  const clone = parser.clone();
  clone.expect(TokenType.Symbol);

  if (
    clone.preview(TokenType.OpenParen) ||
    clone.preview(TokenType.Symbol, TokenType.OpenParen)
  ) {
    clone.advanceUntil(TokenType.CloseParen);
    clone.advance();
    if (clone.preview(TokenType.Member) || clone.preview(TokenType.Semi)) {
      return parse_function_call_stmt();
    } else if (
      clone.preview(TokenType.OpenCurly) ||
      clone.preview(TokenType.Inline)
    ) {
      return parse_function_stmt();
    } else {
      throw new Error();
    }
  }

  if (clone.peek(TokenType.Symbol)) {
    if (clone.preview(TokenType.Assignement) || clone.preview(TokenType.Semi)) {
      return parse_field_stmt();
    }

    if (clone.preview(TokenType.Inline) || clone.preview(TokenType.OpenCurly)) {
      return parse_property_stmt();
    }
  }

  // return parse_var_decl_stmt();
  return parse_expr(BindingPower.Default);
}
