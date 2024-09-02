import { Statement, Type, Expression } from "../ast/ast";
import { CallExpr, NewExpr } from "../ast/expressions";
import { ExpressionStmt, VarDeclarationStmt, BlockStmt, Parameter, FunctionDeclarationStmt, IfStmt, ImportStmt, ForeachStmt, ClassDeclarationStmt } from "../ast/statements";
import { TokenKind } from "../lexer/TokenKind";
import { BindingPower } from "./BindingPower";
import { parse_expr } from "./expr";
import { STMT_LOOKUP } from "./lookups";
import { Parser } from "./Parser";
import { parse_type } from "./types";

export function parse_stmt(p: Parser): Statement {
    const stmt_fn = STMT_LOOKUP.get(p.currentTokenKind);

    if (stmt_fn) {
        return stmt_fn(p);
    }

    return parse_expression_stmt(p);
}

export function parse_expression_stmt(p: Parser): ExpressionStmt {
    const expr = parse_expr(p);
    p.expect(TokenKind.SEMI_COLON);

    return new ExpressionStmt(expr);
}

export function parse_var_decl_stmt(p: Parser): Statement {
    let explicitType: Type | null = null;
    const startToken = p.advance().Kind
    const isConstant = startToken === TokenKind.CONST
    const symbolName = p.expect(TokenKind.IDENTIFIER)


    if (p.currentTokenKind === TokenKind.COLON) {
        p.expect(TokenKind.COLON)
        explicitType = parse_type(p, BindingPower.DEFAULT)
    }

    let assignmentValue: Expression | null = null;
    if (p.currentTokenKind !== TokenKind.SEMI_COLON) {
        p.expect(TokenKind.ASSIGNMENT)
        assignmentValue = parse_expr(p, BindingPower.ASSIGNMENT)
    } else if (!explicitType) {
        throw new Error("Missing explicit type for variable declaration.")
    }

    p.expect(TokenKind.SEMI_COLON)

    if (isConstant && !assignmentValue) {
        throw new Error("Cannot define constant variable without providing default value.")
    }

    return new VarDeclarationStmt(
        symbolName.Value,
        isConstant,
        assignmentValue,
        explicitType,
    )
}

export function parse_block_stmt(p: Parser): Statement {
    p.expect(TokenKind.OPEN_CURLY)
    const body: Statement[] = []

    while (!currentIs(p, TokenKind.CLOSE_CURLY)) {
        body.push(parse_stmt(p));
    }

    p.expect(TokenKind.CLOSE_CURLY)
    return new BlockStmt(
        body,
    )
}

export function currentIs(p: Parser, ...kinds: TokenKind[]): boolean {
    return p.hasTokens() && kinds.includes(p.currentTokenKind);
}
export function parse_fn_params_and_body(p: Parser): [Parameter[], Type | null, Statement[]] {
    const functionParams: Parameter[] = [];

    p.expect(TokenKind.OPEN_PAREN)
    while (!currentIs(p, TokenKind.CLOSE_PAREN)) {
        const paramName = p.expect(TokenKind.IDENTIFIER).Value
        p.expect(TokenKind.COLON)
        const paramType = parse_type(p, BindingPower.DEFAULT)

        functionParams.push(
            new Parameter(
                paramName,
                paramType,
            )
        );

        if (!p.currentToken.isOneOfMany(TokenKind.CLOSE_PAREN, TokenKind.EOF)) {
            p.expect(TokenKind.COMMA)
        }
    }

    p.expect(TokenKind.CLOSE_PAREN)
    var returnType: Type | null = null;

    if (p.currentTokenKind === TokenKind.COLON) {
        p.advance()
        returnType = parse_type(p, BindingPower.DEFAULT)
    }

    const functionBody = Statement.expect(parse_block_stmt(p), BlockStmt).Body;

    return [functionParams, returnType, functionBody]
}
export function parse_fn_declaration(p: Parser): Statement {
    p.advance()
    const name = p.expect(TokenKind.IDENTIFIER).Value
    const [params, returnType, body] = parse_fn_params_and_body(p);

    return new FunctionDeclarationStmt(
        name,
        body,
        params,
        returnType,
    );
}
export function parse_if_stmt(p: Parser): Statement {
    p.advance()
    const condition = parse_expr(p, BindingPower.ASSIGNMENT);
    const consequent = parse_block_stmt(p);

    let alternate: Statement | null = null;
    if (p.currentTokenKind === TokenKind.ELSE) {
        p.advance()

        if (p.currentTokenKind !== TokenKind.ELSE && p.currentTokenKind === TokenKind.IF) {
            alternate = parse_if_stmt(p)
        } else {
            alternate = parse_block_stmt(p)
        }
    }

    return new IfStmt(
        condition,
        consequent,
        alternate
    );
}
export function parse_import_stmt(p: Parser): Statement {
    p.advance()
    let importFrom: string | null = null;
    const importName = p.expect(TokenKind.IDENTIFIER).Value

    if (p.currentTokenKind == TokenKind.FROM) {
        p.advance()
        importFrom = p.expect(TokenKind.STRING).Value
    } else {
        importFrom = importName
    }

    p.expect(TokenKind.SEMI_COLON)
    return new ImportStmt(
        importName,
        importFrom
    )
}
export function parse_foreach_stmt(p: Parser): Statement {
    p.advance()
    const valueName = p.expect(TokenKind.IDENTIFIER).Value

    let index: boolean = false;
    if (p.currentTokenKind === TokenKind.COMMA) {
        p.expect(TokenKind.COMMA)
        p.expect(TokenKind.IDENTIFIER)
        index = true
    }

    p.expect(TokenKind.IN)
    const iterable = parse_expr(p)
    const body = Statement.expect(parse_block_stmt(p), BlockStmt).Body;

    return new ForeachStmt(
        valueName,
        index,
        iterable,
        body,
    );
}
export function parse_class_declaration_stmt(p: Parser): Statement {
    p.advance()
    const name = p.expect(TokenKind.IDENTIFIER).Value
    const body = Statement.expect(parse_block_stmt(p), BlockStmt).Body;

    return new ClassDeclarationStmt(
        name,
        body,
    )
}


export function parse_class_instanciation_expr(p: Parser): Expression {
    p.advance()
    const classInstantiation = Expression.expect(parse_expr(p), CallExpr)

    return new NewExpr(classInstantiation);
}
