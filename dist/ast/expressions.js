"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewExpr = exports.ArrayLiteral = exports.FunctionExpr = exports.RangeExpr = exports.ComputedExpr = exports.CallExpr = exports.MemberExpr = exports.PrefixExpr = exports.AssignmentExpr = exports.BinaryExpr = exports.SymbolExpr = exports.StringExpr = exports.NumberExpr = void 0;
const AstBase_1 = require("./AstBase");
class NumberExpr extends AstBase_1.Expression {
    _value;
    constructor(_value) {
        super(NumberExpr.name);
        this._value = _value;
    }
}
exports.NumberExpr = NumberExpr;
class StringExpr extends AstBase_1.Expression {
    _value;
    constructor(_value) {
        super(StringExpr.name);
        this._value = _value;
    }
}
exports.StringExpr = StringExpr;
class SymbolExpr extends AstBase_1.Expression {
    _value;
    constructor(_value) {
        super(SymbolExpr.name);
        this._value = _value;
    }
}
exports.SymbolExpr = SymbolExpr;
class BinaryExpr extends AstBase_1.Expression {
    _left;
    _operator;
    _right;
    constructor(_left, _operator, _right) {
        super(BinaryExpr.name);
        this._left = _left;
        this._operator = _operator;
        this._right = _right;
    }
}
exports.BinaryExpr = BinaryExpr;
class AssignmentExpr extends AstBase_1.Expression {
    _assigne;
    _assignedValue;
    constructor(_assigne, _assignedValue) {
        super(AssignmentExpr.name);
        this._assigne = _assigne;
        this._assignedValue = _assignedValue;
    }
}
exports.AssignmentExpr = AssignmentExpr;
class PrefixExpr extends AstBase_1.Expression {
    _operator;
    _right;
    constructor(_operator, _right) {
        super(PrefixExpr.name);
        this._operator = _operator;
        this._right = _right;
    }
}
exports.PrefixExpr = PrefixExpr;
class MemberExpr extends AstBase_1.Expression {
    _member;
    _property;
    constructor(_member, _property) {
        super(MemberExpr.name);
        this._member = _member;
        this._property = _property;
    }
}
exports.MemberExpr = MemberExpr;
class CallExpr extends AstBase_1.Expression {
    _method;
    _args;
    constructor(_method, _args) {
        super(CallExpr.name);
        this._method = _method;
        this._args = _args;
    }
}
exports.CallExpr = CallExpr;
class ComputedExpr extends AstBase_1.Expression {
    _member;
    _property;
    constructor(_member, _property) {
        super(ComputedExpr.name);
        this._member = _member;
        this._property = _property;
    }
}
exports.ComputedExpr = ComputedExpr;
class RangeExpr extends AstBase_1.Expression {
    _lower;
    _upper;
    constructor(_lower, _upper) {
        super(RangeExpr.name);
        this._lower = _lower;
        this._upper = _upper;
    }
}
exports.RangeExpr = RangeExpr;
class FunctionExpr extends AstBase_1.Expression {
    _parameters;
    _body;
    _returnType;
    constructor(_parameters, _body, _returnType) {
        super(FunctionExpr.name);
        this._parameters = _parameters;
        this._body = _body;
        this._returnType = _returnType;
    }
}
exports.FunctionExpr = FunctionExpr;
class ArrayLiteral extends AstBase_1.Expression {
    _contents;
    constructor(_contents) {
        super(ArrayLiteral.name);
        this._contents = _contents;
    }
}
exports.ArrayLiteral = ArrayLiteral;
class NewExpr extends AstBase_1.Expression {
    _instantiation;
    constructor(_instantiation) {
        super(NewExpr.name);
        this._instantiation = _instantiation;
    }
}
exports.NewExpr = NewExpr;
//# sourceMappingURL=expressions.js.map