"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPatternsB = exports.TokenPatterns = exports.Ignored = void 0;
exports.Ignored = [
    /^\/\/[^\n]+\n/,
    /^\/\/\/[^\n]+\n/,
];
exports.TokenPatterns = [
    // Variable length
    /^\w+/,
    /^\d+/,
    /^\d+m/,
    /^"[^"]*"/,
    // Double char
    /^\=\>/,
    /^\<\=/,
    /^\>\=/,
    /^\=\=/,
    /^\!\=/,
    /^\&\&/,
    /^\|\|/,
    // Single char
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
];
exports.TokenPatternsB = {
    variable: [/^\w+/, /^\d+/, /^\d+m/, /^"[^"]*"/],
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
//# sourceMappingURL=patterns.js.map