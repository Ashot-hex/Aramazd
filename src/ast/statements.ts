import { Expression, Statement } from "./ast";

export class BlockStmt extends Statement {
    public constructor(
        private body: Statement[],
    ) { super(); }
}
export class ExpressionStmt extends Statement {
    public constructor(
        private expr: Expression,
    ) { super(); }
}
export class VarDeclarationStmt extends Statement {
    public constructor(
        private varname: string,
        private isConst: boolean,
        private assignedValue: Expression,
        // private explicitType: Type,
    ) { super(); }
}