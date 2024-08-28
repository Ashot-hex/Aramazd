import fs from 'node:fs';
import { Parser } from './parsing/Parser';

try {
    const source = fs.readFileSync('./src/source.lang', 'utf8');
    const result = Parser.Parse(source);

    print(result);
}
catch (err) {
    console.error((<Error>err).message);
    console.error((<Error>err));
}

function print(o: any): void {
    console.log(JSON.stringify(o, null, 2))
}