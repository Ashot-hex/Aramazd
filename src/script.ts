import * as fs from "fs";
import Lexer from "./lexing/Lexer";
import { parser } from "./pasring/Parser";

const file = "./input/Test.cs";
console.warn("parsing", file);

const content = fs.readFileSync(file, "utf-8");
const lexer = new Lexer(content);

const N = 1;
function timeit(name: string, func: Function) {
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    func();
  }
  const end = performance.now();
  const duration = end - start;
  console.log(name, ":", Math.round(duration * 10) / 10000 + "sec");
}

function main() {
  parse();
}

function tokenize() {
  const tokens = lexer.tokenize();

  fs.writeFileSync(
    "./tokens.json",
    JSON.stringify(
      tokens.map((t) => {
        return { value: t.value, pos: t.pos };
      })
    ),
    { encoding: "utf-8" }
  );
}

function parse() {
  let data = "";
  try {
    parser.setTokens(lexer.tokenize());
    const block = parser.parse();
    data = JSON.stringify(block);

    fs.writeFileSync("./error.json", '["no error"]', {
      encoding: "utf-8",
    });
  } catch (err) {
    const error = err as Error;
    const stack = (error.stack ?? "").split("\n").slice(1, 3);
    const stripedStack = stack.at(0)?.includes("at Parser.expect")
      ? stack.at(1)
      : stack.at(0);

    data = "SyntaxError:" + (error.message ?? error);
    console.error(data);
    console.error(
      stripedStack?.replace(".js", ".ts").replace("/dist/", "/src/")
    );
  } finally {
    fs.writeFileSync("./stmt.json", data, {
      encoding: "utf-8",
    });
  }
}

timeit("main", main);
