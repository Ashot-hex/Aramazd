import * as fs from "fs";
import Lexer from "./lexing/Lexer";
import Parser from "./pasring/Parser";

const content = fs.readFileSync("./input/00.lang", "utf-8");
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

timeit("lexer", lexer.tokenize.bind(lexer));

const tokens = lexer.tokenize();
const block = new Parser(tokens).parse();

fs.writeFileSync("./tokens.json", JSON.stringify(tokens.map((t) => [t.type.name, t.value]))), { encoding: "utf-8" };
fs.writeFileSync("./stmt.json", JSON.stringify(block), { encoding: "utf-8" });