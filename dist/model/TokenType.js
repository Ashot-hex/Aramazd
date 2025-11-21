"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
class TokenType {
    name;
    static Map = new Map();
    constructor(name) {
        this.name = name;
        TokenType.Map.set(this.name, this);
    }
    static ToTokenType(name) {
        return this.Map.get(name);
    }
    static Comment = new TokenType("Comment");
    static Symbol = new TokenType("Symbol");
    static Integer = new TokenType("Integer");
    static Float = new TokenType("Float");
    static Decimal = new TokenType("Decimal");
    static FloatDecimal = new TokenType("FloatDecimal");
    static String = new TokenType("String");
    static InlineBody = new TokenType("InlineBody");
    static LessOrEqual = new TokenType("LessOrEqual");
    static GreaterOrEqual = new TokenType("GreaterOrEqual");
    static Equal = new TokenType("Equal");
    static NotEqual = new TokenType("NotEqual");
    static And = new TokenType("And");
    static Or = new TokenType("Or");
    static Coalesce = new TokenType("Coalesce");
    static OpenParen = new TokenType("OpenParen");
    static CloseParen = new TokenType("CloseParen");
    static OpenBrace = new TokenType("OpenBrace");
    static CloseBrace = new TokenType("CloseBrace");
    static OpenBracket = new TokenType("OpenBracket");
    static CloseBracket = new TokenType("CloseBracket");
    static LessThan = new TokenType("LessThan");
    static GreaterThan = new TokenType("GreaterThan");
    static Member = new TokenType("Member");
    static Comma = new TokenType("Comma");
    static Semi = new TokenType("Semi");
    static Plus = new TokenType("Plus");
    static Dash = new TokenType("Dash");
    static Star = new TokenType("Star");
    static Slash = new TokenType("Slash");
    static Assign = new TokenType("Assign");
    static TernaryIf = new TokenType("TernaryIf");
    static TernaryElse = new TokenType("TernaryElse");
    static LogicalAnd = new TokenType("LogicalAnd");
    static LogicalOr = new TokenType("LogicalOr");
    static Not = new TokenType("Not");
    static EOF = new TokenType("EOF");
}
exports.TokenType = TokenType;
//# sourceMappingURL=TokenType.js.map