import Token from "../Token";

export interface Expr {}
export interface NumberExpr extends Expr {
	value: number;
}

export interface StringExpr extends Expr {
	value: string;
}

export interface SymbolExpr extends Expr {
	value: string;
}

// -------------------
// COMPLEX EXPRESSIONS
// -------------------

export interface BinaryExpr extends Expr {
	left: Expr;
	operator: Token;
	right: Expr;
}
