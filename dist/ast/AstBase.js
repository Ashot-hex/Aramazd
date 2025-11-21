"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.Expression = exports.Statement = void 0;
class Statement {
    _subinstance_name;
    constructor(_subinstance_name) {
        this._subinstance_name = _subinstance_name;
    }
    get name() { return this._subinstance_name; }
    ;
    statement() { }
    static expect(stmt, ctor) {
        return expect(stmt, ctor);
    }
}
exports.Statement = Statement;
class Expression {
    _name;
    constructor(_name) {
        this._name = _name;
    }
    get name() { return this._name; }
    ;
    expression() { }
    static expect(expr, ctor) {
        return expect(expr, ctor);
    }
}
exports.Expression = Expression;
class Type {
    type() { }
}
exports.Type = Type;
function expect(received, expected) {
    if (expected.name !== received.name) {
        throw new Error(`Expected ${expected.name} but received ${received.name}`);
    }
    return received;
}
//# sourceMappingURL=AstBase.js.map