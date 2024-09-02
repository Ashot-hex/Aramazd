import { Expression, Statement, Type } from "./ast";

export class BlockStmt extends Statement {
    public constructor(
        private _body: Statement[],
    ) { super(BlockStmt.name); }

    public get Body() { return this._body };
}
export class ExpressionStmt extends Statement {
    public constructor(
        private _expr: Expression,
    ) { super(ExpressionStmt.name); }
}

export class VarDeclarationStmt extends Statement {
    public constructor(
        private _identifier: string,
        private _is_constant: boolean,
        private _assignedValue: Expression | null,
        private _explicitType: Type | null
    ) { super(VarDeclarationStmt.name); }
}

export class Parameter {
    public constructor(
        private name: string,
        private type: Type,
    ) { }
}

export class FunctionDeclarationStmt extends Statement {
    public constructor(
        private _name: string,
        private _body: Statement[],
        private _parameters: Parameter[],
        private _returnType: Type | null,
    ) { super(FunctionDeclarationStmt.name); }
}

export class IfStmt extends Statement {
    public constructor(
        private _condition: Expression,
        private _consequent: Statement,
        private _alternate: Statement | null,
    ) { super(IfStmt.name); }
}

export class ImportStmt extends Statement {
    public constructor(
        private _name: string,
        private _from: string,
    ) { super(ImportStmt.name); }
}

export class ForeachStmt extends Statement {
    public constructor(
        private _value: string,
        private _index: boolean,
        private _iterable: Expression,
        private _body: Statement[],
    ) { super(ForeachStmt.name); }
}

export class ClassDeclarationStmt extends Statement {
    public constructor(
        private _name: string,
        private _body: Statement[],
    ) { super(ClassDeclarationStmt.name); }
}