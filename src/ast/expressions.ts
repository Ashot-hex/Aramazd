import { Token } from "../lexer/Token";
import { Expression } from "./ast";

export class NumberExpr extends Expression {
    public constructor(
        private value: number
    ) { super(); }
}

export class StringExpr extends Expression {
    public constructor(
        private value: string
    ) { super(); }
}

export class SymbolExpr extends Expression {
    public constructor(
        private value: string
    ) { super(); }
}

export class BinaryExpr extends Expression {
    public constructor(
        private left: Expression,
        private token: Token,
        private right: Expression,
    ) { super(); }
}

export class PrefixExpr extends Expression {
    public constructor(
        private token: Token,
        private right: Expression,
    ) { super(); }
}

export class AssignementExpr extends Expression {
    public constructor(
        private assigne: Expression,
        private operator: Token,
        private value: Expression,
    ) { super(); }
}