"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("../model/TokenType");
const Patterns = {
    ignored: {
        Comment: /^\/\/[^\n^\r]*/,
    },
    variable: {
        Number: /^(\d*.)?\d+m?/,
        String: /^"[^"]*"/,
        Symbol: /^\w+/,
    },
    double: {
        InlineBody: /^\=\>/,
        LessOrEquals: /^\<\=/,
        GreaterOrEquals: /^\>\=/,
        Equals: /^\=\=/,
        NotEquals: /^\!\=/,
        And: /^\&\&/,
        Or: /^\|\|/,
        Coalesce: /^\|\|/,
        DotDot: /^\.\./,
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