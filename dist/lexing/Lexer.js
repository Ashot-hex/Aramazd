"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("../model/TokenType");
const Patterns_1 = __importDefault(require("./Patterns"));
const Text_1 = require("./Text");
class Lexer {
    _content;
    constructor(_content) {
        this._content = _content;
    }
    get text() {
        return new Text_1.Text(this._content);
    }
    tokenize() {
        const text = this.text;
        const tokens = [];
        while (!text.atEOF) {
            let skip = false;
            for (const [_, pattern] of Object.entries(Patterns_1.default.ignored)) {
                const match = text.remaining.match(pattern);
                if (match) {
                    text.advance(match[0].length);
                    skip = true;
                    break;
                }
            }
            if (skip)
                continue;
            let bestMatchName = "";
            let bestMatch = "";
            for (const [name, pattern] of Object.entries(Patterns_1.default.variable)) {
                const match = text.remaining.match(pattern);
                if (match && match[0].length > bestMatch.length) {
                    bestMatchName = name;
                    bestMatch = match[0];
                }
            }
            if (bestMatch.length < 2) {
                for (const [name, pattern] of Object.entries(Patterns_1.default.double)) {
                    const match = text.remaining.match(pattern);
                    if (match) {
                        bestMatchName = name;
                        bestMatch = match[0];
                        break;
                    }
                }
            }
            if (bestMatch.length < 1) {
                for (const [name, pattern] of Object.entries(Patterns_1.default.single)) {
                    const match = text.remaining.match(pattern);
                    if (match) {
                        bestMatchName = name;
                        bestMatch = match[0];
                        break;
                    }
                }
            }
            if (!bestMatch) {
                throw new Error("Didn't recognize \"" + text.remaining.slice(0, 30) + '..."');
            }
            tokens.push({
                type: TokenType_1.TokenType.ToTokenType(bestMatchName),
                value: bestMatch,
            });
            text.advance(bestMatch.length);
        }
        tokens.push({
            type: TokenType_1.TokenType.EOF,
            value: TokenType_1.TokenType.EOF.name,
        });
        return tokens;
    }
}
exports.default = Lexer;
//# sourceMappingURL=Lexer.js.map