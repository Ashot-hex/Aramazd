"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ignored: [/^\/\/[^\n^\r]*/],
    variable: [/^\w+/, /^\d+/, /^\d+.\d+/, /^\d+m/, /^\d+.\d+m/, /^"[^"]*"/],
    double: [/^\=\>/, /^\<\=/, /^\>\=/, /^\=\=/, /^\!\=/, /^\&\&/, /^\|\|/],
    single: [
        /^\(/,
        /^\)/,
        /^\{/,
        /^\}/,
        /^\[/,
        /^\]/,
        /^\</,
        /^\>/,
        /^\./,
        /^\,/,
        /^\;/,
        /^\+/,
        /^\-/,
        /^\*/,
        /^\//,
        /^\=/,
        /^\?/,
        /^\:/,
        /^\&/,
        /^\|/,
        /^\!/,
    ],
};
//# sourceMappingURL=Patterns.js.map