"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("../model/TokenType");
const Patterns = {
    ignored: {
        Comment: /^\/\/[^\n^\r]*/,
    },
    variable: {
        Symbol: /^\w+/,
        Integer: /^\d+/,
        Float: /^\d+.\d+/,
        Decimal: /^\d+m/,
        FloatDecimal: /^\d+.\d+m/,
        String: /^"[^"]*"/,
    },
    double: {
        InlineBody: /^\=\>/,
        LessOrEqual: /^\<\=/,
        GreaterOrEqual: /^\>\=/,
        Equal: /^\=\=/,
        NotEqual: /^\!\=/,
        And: /^\&\&/,
        Or: /^\|\|/,
        Coalesce: /^\|\|/,
    },
    single: {
        OpenParen: /^\(/,
        CloseParen: /^\)/,
        OpenBrace: /^\{/,
        CloseBrace: /^\}/,
        OpenBracket: /^\[/,
        CloseBracket: /^\]/,
        LessThan: /^\</,
        GreaterThan: /^\>/,
        Member: /^\./,
        Comma: /^\,/,
        Semi: /^\;/,
        Plus: /^\+/,
        Dash: /^\-/,
        Star: /^\*/,
        Slash: /^\//,
        Assign: /^\=/,
        TernaryIf: /^\?/,
        TernaryElse: /^\:/,
        LogicalAnd: /^\&/,
        LogicalOr: /^\|/,
        Not: /^\!/,
    },
};
exports.default = Patterns;
function checkValidity() {
    const patterns = Object.values(Patterns).flatMap((p) => Object.keys(p));
    const errors = [];
    for (const p of patterns) {
        if (!TokenType_1.TokenType.ToTokenType(p)) {
            errors.push(p);
        }
    }
    if (errors.length) {
        throw new Error("Patterns Not matching with Tokens :" + JSON.stringify(errors, null, 2));
    }
}
checkValidity();
//# sourceMappingURL=Patterns.js.map