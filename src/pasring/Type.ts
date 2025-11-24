import { Type } from "../model/Ast";
import { BindingPower } from "../model/BindingPower";
import { TokenType } from "../model/TokenType";
import { parser } from "./Parser";

type type_nud_handler = () => Type;
type type_led_handler = (left: Type, bp: BindingPower) => Type;

const TypeBpLookup = new Map<TokenType, BindingPower>();
const TypeLedLookup = new Map<TokenType, type_led_handler>();
const TypeNudLookup = new Map<TokenType, type_nud_handler>();

export function type_led(
  kind: TokenType,
  bp: BindingPower,
  led_fn: type_led_handler
) {
  TypeBpLookup.set(kind, bp);
  TypeLedLookup.set(kind, led_fn);
}

export function type_nud(kind: TokenType, nud_fn: type_nud_handler) {
  TypeNudLookup.set(kind, nud_fn);
}

export function createTokenTypeLookups() {
  type_nud(TokenType.Symbol, parse_symbol_type);
  type_nud(TokenType.OpenBracket, parse_array_type);
}

export function parse_symbol_type(): Type {
  return {
    name: parser.expect(TokenType.Symbol).value,
  };
}

export function parse_array_type(): Type {
  parser.advance();
  parser.expect(TokenType.CloseBracket);
  var underlying = parse_type(BindingPower.Default);
  return {
    underlying,
  };
}

export function parse_type(bp: BindingPower): Type {
  const nud_fn = TypeNudLookup.get(parser.currentTokenType);

  if (!nud_fn) {
    throw new Error("Expected Type NUD Handler");
  }

  let left = nud_fn();
  while (TypeBpLookup.get(parser.currentTokenType)! > bp) {
    const led_fn = TypeLedLookup.get(parser.currentTokenType);

    if (!led_fn) {
      throw new Error("Expected Type LED Handler");
    }

    left = led_fn(left, TypeBpLookup.get(parser.currentTokenType)!);
  }

  return left;
}
