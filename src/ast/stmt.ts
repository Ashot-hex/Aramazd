import { Expr, Stmt } from "./ast";

export class BlockStmt extends Stmt {
    public constructor(
        private body: Stmt[],
    ) { super(); }
}
export class ExpressionStmt extends Stmt {
    public constructor(
        private expr: Expr,
    ) { super(); }
}
export class VarDeclarationStmt extends Stmt {
    public constructor(
        private varname: string,
        private isConst: boolean,
        private assignedValue: Expr,
        // private explicitType: Type,
    ) { super(); }
}