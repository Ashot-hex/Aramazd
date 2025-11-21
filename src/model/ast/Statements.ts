import { Expr } from "./Expressions";

export interface Stmt {}

export interface BlockStmt {
	body: Stmt[];
}

export interface ExpressionStmt {
	expression: Expr;
}
