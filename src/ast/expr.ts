import { Token } from "../lexer/Token";
import { Expr } from "./ast";

//#region litterals
export class NumberExpr extends Expr {
    public constructor(
        private value: number
    ) { super(); }
}

export class StringExpr extends Expr {
    public constructor(
        private value: string
    ) { super(); }
}

export class SymbolExpr extends Expr {
    public constructor(
        private value: string
    ) { super(); }
}
//#endregion litterals

//#region complex
export class BinaryExpr extends Expr {
    public constructor(
        private left: Expr,
        private token: Token,
        private right: Expr,
    ) { super(); }
}

export class PrefixExpr extends Expr {
    public constructor(
        private token: Token,
        private right: Expr,
    ) { super(); }
}

export class AssignementExpr extends Expr {
    public constructor(
        private assigne: Expr,
        private operator: Token,
        private value: Expr,
    ) { super(); }
}
//#endregion complex