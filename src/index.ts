import fs from 'node:fs';
import { Parser } from './parser/parser';

try {
    const source = fs.readFileSync('./src/source.lang', 'utf8');
    const result = Parser.Parse(source);

    json(result);
}
catch (err) {
    console.error((<Error>err).message);
    console.error((<Error>err));
}

function json(o: any): void {
    console.log(JSON.stringify(o, null, 2))
}