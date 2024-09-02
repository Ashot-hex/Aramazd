import { Expression } from "../ast/ast";
import { AssignmentExpr, RangeExpr, ComputedExpr, MemberExpr, ArrayLiteral, CallExpr, FunctionExpr, NumberExpr, StringExpr, SymbolExpr, BinaryExpr, PrefixExpr } from "../ast/expressions";
import { TokenKind } from "../lexer/TokenKind";
import { BindingPower } from "./BindingPower";
import { NUD_LOOKUP, BP_LOOKUP, LED_LOOKUP } from "./lookups";
import { Parser } from "./Parser";
import { parse_fn_params_and_body } from "./stmt";

export function parse_expr(p: Parser, bp: BindingPower = BindingPower.DEFAULT): Expression {
    const tokenKind = p.currentTokenKind
    const nud_fn = NUD_LOOKUP.get(tokenKind);

    if (!nud_fn) {
        throw new Error("NUD Handler expected for token " + tokenKind);
    }

    let left = nud_fn(p)
    while (BP_LOOKUP.get(p.currentTokenKind)! > bp) {
        const tokenKind = p.currentTokenKind
        const led_fn = LED_LOOKUP.get(tokenKind);

        if (!led_fn) {
            throw new Error("LED Handler expected for token " + tokenKind);
        }

        left = led_fn(p, left, BP_LOOKUP.get(p.currentTokenKind)!)
    }

    return left
}

export function parse_assignment_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    p.advance()
    const rhs = parse_expr(p, bp)

    return new AssignmentExpr(
        left,
        rhs,
    );
}


export function parse_range_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    p.advance()
    return new RangeExpr(
        left,
        parse_expr(p, bp),
    );
}

export function parse_member_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    const isComputed = p.advance().Kind === TokenKind.OPEN_BRACKET;

    if (isComputed) {
        const rhs = parse_expr(p, bp)
        p.expect(TokenKind.CLOSE_BRACKET)
        return new ComputedExpr(
            left,
            rhs,
        );
    }

    return new MemberExpr(
        left,
        p.expect(TokenKind.IDENTIFIER).Value,
    );
}

export function parse_array_literal_expr(p: Parser): Expression {
    p.expect(TokenKind.OPEN_BRACKET)
    const arrayContents: Expression[] = [];

    while (p.hasTokens() && p.currentTokenKind != TokenKind.CLOSE_BRACKET) {
        arrayContents.push(parse_expr(p, BindingPower.LOGICAL))

        if (![TokenKind.EOF, TokenKind.CLOSE_BRACKET].includes(p.currentTokenKind)) {
            p.expect(TokenKind.COMMA)
        }
    }

    p.expect(TokenKind.CLOSE_BRACKET)

    return new ArrayLiteral(
        arrayContents,
    )
}

export function parse_call_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    p.advance()
    const args: Expression[] = [];

    while (p.hasTokens() && p.currentTokenKind != TokenKind.CLOSE_PAREN) {
        args.push(parse_expr(p, BindingPower.ASSIGNMENT));

        if (![TokenKind.EOF, TokenKind.CLOSE_PAREN].includes(p.currentTokenKind)) {
            p.expect(TokenKind.COMMA)
        }
    }

    p.expect(TokenKind.CLOSE_PAREN)
    return new CallExpr(
        left,
        args,
    )
}

export function parse_fn_expr(p: Parser): Expression {
    p.expect(TokenKind.FN)
    const [functionParams, returnType, functionBody] = parse_fn_params_and_body(p)

    return new FunctionExpr(
        functionParams,
        functionBody,
        returnType,
    )
}

export function parse_grouping_expr(p: Parser): Expression {
    p.advance();
    const expr = parse_expr(p);
    p.expect(TokenKind.CLOSE_PAREN);
    return expr;
}


export function parse_primary_expr(p: Parser): Expression {
    switch (p.currentTokenKind) {
        case TokenKind.NUMBER:
            return new NumberExpr(Number(p.advance().Value))
        case TokenKind.STRING:
            return new StringExpr(p.advance().Value);
        case TokenKind.IDENTIFIER:
            return new SymbolExpr(p.advance().Value);
        default:
            throw new Error("Cannot create primary_expr from " + p.currentTokenKind);
    }
}


export function parse_binary_expr(p: Parser, left: Expression, bp: BindingPower): Expression {
    const operatorToken = p.advance()
    const right = parse_expr(p, bp)

    return new BinaryExpr(
        left,
        operatorToken,
        right,
    );
}

export function parse_prefix_expr(p: Parser): Expression {
    const operator = p.advance();
    const rhs = parse_expr(p);

    return new PrefixExpr(operator, rhs);
}