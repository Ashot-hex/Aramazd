import { exit } from "process";
import { TokenType } from "../model/TokenType";

const Patterns = {
  ignored: {
    Comment: /^\/\/[^\n^\r]*/,
  },

  reserved: {
    Class: /^class/,
    Using: /^using/,
    Namespace: /^namespace/,
    Public: /^public/,
    Private: /^private/,
    Const: /^const/,
    Static: /^static/,
    Readonly: /^readonly/,
    Get: /^get/,
    Set: /^set/,
  },
  variable: {
    Number: /^(\d*.)?\d+m?/,
    String: /^"[^"]*"/,
    Symbol: /^\w+/,
  },

  double: {
    Inline: /^\=\>/,
  },
  single: {
    OpenBracket: /^\[/,
    CloseBracket: /^\]/,
    OpenCurly: /^\{/,
    CloseCurly: /^\}/,
    OpenParen: /^\(/,
    CloseParen: /^\)/,
    Semi: /^\;/,
    Plus: /^\+/,
    Star: /^\*/,
    Member: /^\./,
    Comma: /^\,/,
    Assignement: /^\=/,
    OpenSubType: /^\</,
    CloseSubType: /^\>/,
  },
};

export default Patterns;

(() => {
  const patterns = new Set(
    Object.values(Patterns).flatMap((p) => Object.keys(p))
  );

  const types = new Set(TokenType.getAll());

  const missingTypes = patterns.difference(types);
  const missingPatterns = types
    .difference(patterns)
    .difference(new Set(["EOF"]));

  let err = "";
  if (missingPatterns.size) {
    err +=
      "Missing patterns : " + JSON.stringify([...missingPatterns], null, 2);
    err += "\n";
  }
  if (missingTypes.size) {
    err += "\nMissing types : " + JSON.stringify([...missingTypes], null, 2);
    err += "\n";
  }

  if (err) {
    console.error(err);
    exit(1);
  }
})();
