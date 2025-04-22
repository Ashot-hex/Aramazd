import fs from 'node:fs';
import { Lexer } from './lexer/Lexer';

try {
    const source = fs.readFileSync('./src/source.lang', 'utf8');
    const tokens = Lexer.Tokenize(source);

    fs.writeFileSync("./output.json", JSON.stringify(tokens.map(t => t.simplify()), null, 2));
}
catch (err) {
    console.error((<Error>err).message);
    console.error((<Error>err));
}

function print(...o: any[]): void {
    const obj = o.length === 1 ? o[0] : o;
    console.log(JSON.stringify(obj, null, 2))
}