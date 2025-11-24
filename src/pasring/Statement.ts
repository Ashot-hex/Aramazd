import { Stmt } from "../model/Ast";
import { BindingPower } from "../model/BindingPower";
import { StmtLookup } from "../model/Lookups";
import { TokenType } from "../model/TokenType";
import {
    parse_expr,
    parse_primary_expr,
    parse_reassignement_expr,
    parse_symbol
} from "./Expression";
import { parser } from "./Parser";

export function parse_stmt(): Stmt {
  const stmt_fn = StmtLookup.get(parser.currentTokenType);

  if (stmt_fn) {
    return stmt_fn();
  }

  const expression = parse_expr(BindingPower.Default);
  parser.expect(TokenType.Semi);

  return {
    expression,
  };
}

export function parse_class_stmt(): Stmt {
  parser.expect(TokenType.Class);
  const name = parser.expect(TokenType.Symbol).value;
  const body = parse_block_stmt();

  return {
    type: "Class",
    name,
    body,
  };
}

export function parse_block_stmt(): Stmt {
  parser.expect(TokenType.OpenCurly);

  const body = new Array<Stmt>();
  while (parser.currentTokenType != TokenType.CloseCurly) {
    body.push(parse_stmt());
  }

  parser.expect(TokenType.CloseCurly);

  return {
    type: "Block",
    body,
  };
}

export function parse_inline_block_stmt(): Stmt {
  parser.expect(TokenType.Inline);

  const body = parse_stmt();

  parser.expect(TokenType.Semi);
  return {
    type: "Inline Block",
    body,
  };
}

export function parse_namespace_stmt(): Stmt {
  parser.expect(TokenType.Namespace);
  const value = parse_expr(BindingPower.Default);

  parser.expect(TokenType.Semi);

  return {
    type: "Namespace",
    value,
  };
}

export function parse_using_stmt(): Stmt {
  parser.expect(TokenType.Using);
  const value = parse_expr(BindingPower.Default);

  parser.expect(TokenType.Semi);

  return {
    type: "Namespace",
    value,
  };
}

export function parse_visibility_stmt(): Stmt {
  const visibility = parser.advance().value;
  const member: Stmt = parse_symbol();

  return {
    visibility,
    member,
  };
}

export function parse_function_call_stmt(): Stmt {
  const name = parser.expect(TokenType.Symbol).value;
  parser.expect(TokenType.OpenParen);
  const params = new Array<Stmt>();
  if (!parser.preview(TokenType.CloseParen)) {
    do {
      params.push({
        value: parser.advance().value,
      });
    } while (parser.peek(TokenType.Comma));
  }
  parser.expect(TokenType.CloseParen);

  let next;
  if (parser.peek(TokenType.Member)) {
    next = parse_stmt();
  } else {
    parser.expect(TokenType.Semi);
  }

  return {
    type: "Function call",
    name,
    params,
    next,
  };
}

export function parse_function_stmt(): Stmt {
  const returnType = parser.expect(TokenType.Symbol).value;
  const name = parser.peek(TokenType.Symbol)?.value;

  parser.expect(TokenType.OpenParen);
  const params = new Array<Stmt>();
  if (!parser.preview(TokenType.CloseParen)) {
    do {
      params.push(parse_param_statement());
    } while (parser.peek(TokenType.Comma));
  }
  parser.expect(TokenType.CloseParen);

  return {
    type: name ? "Function" : "Constructor",
    name: name ?? "constructor",
    params,
    returnType,
    body: parser.preview(TokenType.Inline)
      ? parse_inline_block_stmt()
      : parse_block_stmt(),
  };
}

export function parse_param_statement(): Stmt {
  const paramType = parser.expect(TokenType.Symbol).value;
  const name = parser.expect(TokenType.Symbol).value;
  const defaultValue = parser.peek(TokenType.Assignement)
    ? parse_primary_expr()
    : null;

  return {
    type: "Parameter",
    name,
    paramType,
    defaultValue,
  };
}

export function parse_var_decl_stmt(): Stmt {
  const isConst = !!parser.peek(TokenType.Const);
  const isStatic = !!parser.peek(TokenType.Static);
  const isReadonly = !!parser.peek(TokenType.Readonly);
  const varType = parser.expect(TokenType.Symbol).value;
  const name = parser.expect(TokenType.Symbol).value;
  const value = parser.preview(TokenType.Assignement)
    ? parse_reassignement_expr()
    : null;

  parser.expect(TokenType.Semi);

  return {
    type: "Variable Declaration",
    isConst,
    isStatic,
    isReadonly,
    name,
    varType,
    value,
  };
}

export function parse_field_stmt(): Stmt {
  const fieldType = parser.expect(TokenType.Symbol).value;
  if (parser.preview(TokenType.Symbol, TokenType.Assignement)) {
    const { assigne, assignedValue } = parse_reassignement_expr() as {
      assigne: object;
      assignedValue: object;
    };
    return {
      type: "Field",
      name: assigne,
      defaultValue: assignedValue,
      fieldType,
    };
  } else {
    const name = parser.expect(TokenType.Symbol).value;
    parser.expect(TokenType.Semi);
    return {
      type: "Field",
      name,
      defaultValue: null,
      fieldType,
    };
  }
}
export function parse_property_stmt(): Stmt {
  const returnType = parser.expect(TokenType.Symbol).value;
  const name = parser.expect(TokenType.Symbol).value;

  let getter;
  let setter;
  if (parser.preview(TokenType.Inline)) {
    getter = parse_inline_block_stmt();
  } else {
    parser.expect(TokenType.OpenCurly);

    if (parser.preview(TokenType.Get)) {
      getter = parse_getter_stmt();
    }
    if (parser.preview(TokenType.Set)) {
      setter = parse_setter_stmt();
    }

    parser.expect(TokenType.CloseCurly);
  }
  return {
    type: "Property",
    name,
    returnType,
    getter,
    setter,
  };
}
export function parse_getter_stmt() {
  parser.expect(TokenType.Get);
  return {
    type: "Getter",
    body: parser.preview(TokenType.Inline)
      ? parse_inline_block_stmt()
      : parse_block_stmt(),
  };
}
export function parse_setter_stmt() {
  parser.expect(TokenType.Set);

  return {
    type: "Setter",
    body: parser.preview(TokenType.Inline)
      ? parse_inline_block_stmt()
      : parse_block_stmt(),
  };
}
