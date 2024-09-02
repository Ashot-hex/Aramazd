import { Type } from "../ast/ast";
import { SymbolType, ListType } from "../ast/types";
import { TokenKind } from "../lexer/TokenKind";
import { BindingPower } from "./BindingPower";
import { Parser } from "./Parser";

type type_nud_handler = (p: Parser) => Type
type type_led_handler = (p: Parser, left: Type, bp: BindingPower) => Type

type type_nud_lookup = Map<TokenKind, type_nud_handler>;
type type_led_lookup = Map<TokenKind, type_led_handler>;
type type_bp_lookup = Map<TokenKind, BindingPower>;

var type_bp_lu: type_bp_lookup = new Map();
var type_nud_lu: type_nud_lookup = new Map();
var type_led_lu: type_led_lookup = new Map();


function type_led(kind: TokenKind, bp: BindingPower, led_fn: type_led_handler) {
    type_bp_lu.set(kind, bp);
    type_led_lu.set(kind, led_fn);
}

function type_nud(kind: TokenKind, bp: BindingPower, nud_fn: type_nud_handler) {
    type_bp_lu.set(kind, BindingPower.PRIMARY);
    type_nud_lu.set(kind, nud_fn);
}

function createTypeTokenLookups() {
    type_nud(TokenKind.IDENTIFIER, BindingPower.PRIMARY, (p: Parser) => {
        return new SymbolType(
            p.advance().Value,
        )
    });

    // []number
    type_nud(TokenKind.OPEN_BRACKET, BindingPower.MEMBER, (p: Parser) => {
        p.advance()
        p.expect(TokenKind.CLOSE_BRACKET)
        const insideType = parse_type(p, BindingPower.DEFAULT);

        return new ListType(
            insideType,
        )
    });
}
createTypeTokenLookups();

export function parse_type(p: Parser, bp: BindingPower): Type {
    const tokenKind = p.currentTokenKind;
    const nud_fn = type_nud_lu.get(tokenKind);

    if (!nud_fn) {
        throw new Error("type: NUD Handler expected for token " + tokenKind);
    }

    let left = nud_fn(p)

    while (type_bp_lu.get(p.currentTokenKind)! > bp) {
        const tokenKind = p.currentTokenKind;
        const led_fn = type_led_lu.get(tokenKind);

        if (!led_fn) {
            throw new Error("type: LED Handler expected for token " + tokenKind);
        }

        left = led_fn(p, left, bp)
    }

    return left
}
