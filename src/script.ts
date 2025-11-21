import * as fs from "fs";
import Lexer from "./lexing/Lexer";

const content = fs.readFileSync("./input/Test.cs", "utf-8");
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
console.log(tokens.length);

fs.writeFileSync("./tokens.json", JSON.stringify(tokens.map(t => [t.type.name, t.value]))), { encoding: "utf-8" };
