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

//#endregion complex