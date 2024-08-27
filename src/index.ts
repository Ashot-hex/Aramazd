import fs from 'node:fs';
import { Lexer } from './lexer/Lexer';

try {
    const source = fs.readFileSync('./src/source.lang', 'utf8');
    const tokens = Lexer.Tokenize(source);

    json(tokens);
}
catch (err) {
    console.error((<Error>err).message);
    console.error((<Error>err));
}

function json(o: any): void {
    console.log(JSON.stringify(o, null, 2))
}