import fs from "node:fs";
import { Lexer } from "./lexer/Lexer";

try {
  const source = fs.readFileSync("./src/source.java", "utf8");
  const tokens = Lexer.Tokenize(source).map((t) => t.simplify());
} catch (err) {
  console.error(<Error>err);
}
