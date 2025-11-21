"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassDeclarationStmt = exports.ForeachStmt = exports.ImportStmt = exports.IfStmt = exports.FunctionDeclarationStmt = exports.Parameter = exports.VarDeclarationStmt = exports.ExpressionStmt = exports.BlockStmt = void 0;
const AstBase_1 = require("./AstBase");
class BlockStmt extends AstBase_1.Statement {
    _body;
    constructor(_body) {
        super(BlockStmt.name);
        this._body = _body;
    }
    get Body() {
        return this._body;
    }
}
exports.BlockStmt = BlockStmt;
class ExpressionStmt extends AstBase_1.Statement {
    _expr;
    constructor(_expr) {
        super(ExpressionStmt.name);
        this._expr = _expr;
    }
}
exports.ExpressionStmt = ExpressionStmt;
class VarDeclarationStmt extends AstBase_1.Statement {
    _identifier;
    _is_constant;
    _assignedValue;
    _explicitType;
    constructor(_identifier, _is_constant, _assignedValue, _explicitType) {
        super(VarDeclarationStmt.name);
        this._identifier = _identifier;
        this._is_constant = _is_constant;
        this._assignedValue = _assignedValue;
        this._explicitType = _explicitType;
    }
}
exports.VarDeclarationStmt = VarDeclarationStmt;
class Parameter {
    name;
    type;
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
exports.Parameter = Parameter;
class FunctionDeclarationStmt extends AstBase_1.Statement {
    _name;
    _body;
    _parameters;
    _returnType;
    constructor(_name, _body, _parameters, _returnType) {
        super(FunctionDeclarationStmt.name);
        this._name = _name;
        this._body = _body;
        this._parameters = _parameters;
        this._returnType = _returnType;
    }
}
exports.FunctionDeclarationStmt = FunctionDeclarationStmt;
class IfStmt extends AstBase_1.Statement {
    _condition;
    _consequent;
    _alternate;
    constructor(_condition, _consequent, _alternate) {
        super(IfStmt.name);
        this._condition = _condition;
        this._consequent = _consequent;
        this._alternate = _alternate;
    }
}
exports.IfStmt = IfStmt;
class ImportStmt extends AstBase_1.Statement {
    _name;
    _from;
    constructor(_name, _from) {
        super(ImportStmt.name);
        this._name = _name;
        this._from = _from;
    }
}
exports.ImportStmt = ImportStmt;
class ForeachStmt extends AstBase_1.Statement {
    _value;
    _index;
    _iterable;
    _body;
    constructor(_value, _index, _iterable, _body) {
        super(ForeachStmt.name);
        this._value = _value;
        this._index = _index;
        this._iterable = _iterable;
        this._body = _body;
    }
}
exports.ForeachStmt = ForeachStmt;
class ClassDeclarationStmt extends AstBase_1.Statement {
    _name;
    _body;
    constructor(_name, _body) {
        super(ClassDeclarationStmt.name);
        this._name = _name;
        this._body = _body;
    }
}
exports.ClassDeclarationStmt = ClassDeclarationStmt;
//# sourceMappingURL=statements.js.map