import fs from 'node:fs';
import { Parser } from './parsing/Parser';
import { Lexer } from './lexer/Lexer';

try {
    const source = fs.readFileSync('./src/source.lang', 'utf8');
    const tokens = Lexer.Tokenize(source);
    const result = Parser.Parse(tokens);

    // print(tokens.map(x => x.simplify()));
    print(result);
}
catch (err) {
    console.error((<Error>err).message);
    console.error((<Error>err));
}

function print(...o: any[]): void {
    const obj = o.length === 1 ? o[0] : o;
    console.log(JSON.stringify(obj, null, 2))
}