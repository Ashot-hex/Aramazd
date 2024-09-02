import { Token } from "../lexer/Token";
import { Expression, Statement, Type } from "./ast";
import { Parameter } from "./statements";

export class NumberExpr extends Expression {
    public constructor(
        private _value: number
    ) { super(NumberExpr.name); }
}

export class StringExpr extends Expression {
    public constructor(
        private _value: string
    ) { super(StringExpr.name); }
}

export class SymbolExpr extends Expression {
    public constructor(
        private _value: string
    ) { super(SymbolExpr.name); }
}

export class BinaryExpr extends Expression {
    public constructor(
        private _left: Expression,
        private _operator: Token,
        private _right: Expression,
    ) { super(BinaryExpr.name); }
}

export class AssignmentExpr extends Expression {
    public constructor(
        private _assigne: Expression,
        private _assignedValue: Expression,
    ) { super(AssignmentExpr.name); }
}

export class PrefixExpr extends Expression {
    public constructor(
        private _operator: Token,
        private _right: Expression,
    ) { super(PrefixExpr.name); }
}

export class MemberExpr extends Expression {
    public constructor(
        private _member: Expression,
        private _property: string,
    ) { super(MemberExpr.name); }
}

export class CallExpr extends Expression {
    public constructor(
        private _method: Expression,
        private _args: Expression[],
    ) { super(CallExpr.name); }
}


export class ComputedExpr extends Expression {
    public constructor(
        private _member: Expression,
        private _property: Expression,
    ) { super(ComputedExpr.name); }
}

export class RangeExpr extends Expression {
    public constructor(
        private _lower: Expression,
        private _upper: Expression,
    ) { super(RangeExpr.name); }
}

export class FunctionExpr extends Expression {
    public constructor(
        private _parameters: Parameter[],
        private _body: Statement[],
        private _returnType: Type | null,
    ) { super(FunctionExpr.name); }
}

export class ArrayLiteral extends Expression {
    public constructor(
        private _contents: Expression[],
    ) { super(ArrayLiteral.name); }
}

export class NewExpr extends Expression {
    public constructor(
        private _instantiation: CallExpr,
    ) { super(NewExpr.name); }
}
