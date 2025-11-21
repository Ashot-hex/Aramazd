import Token from "../model/Token";
import { TokenType } from "../model/TokenType";
import Patterns from "./Patterns";
import { Text } from "./Text";

export default class Lexer {
	public constructor(private _content: string) {}

	private get text(): Text {
		return new Text(this._content);
	}

	tokenize() {
		const text = this.text;
		const tokens: Token[] = [];
		while (!text.atEOF) {
			let skip = false;
			for (const [_, pattern] of Object.entries(Patterns.ignored)) {
				const match = text.remaining.match(pattern);
				if (match) {
					text.advance(match[0].length);
					skip = true;
					break;
				}
			}
			if (skip) continue;

			let bestMatchName = "";
			let bestMatch = "";
			for (const [name, pattern] of Object.entries(Patterns.variable)) {
				const match = text.remaining.match(pattern);
				if (match && match[0].length > bestMatch.length) {
					bestMatchName = name;
					bestMatch = match[0];
				}
			}

			if (bestMatch.length < 2) {
				for (const [name, pattern] of Object.entries(Patterns.double)) {
					const match = text.remaining.match(pattern);
					if (match) {
						bestMatchName = name;
						bestMatch = match[0];
						break;
					}
				}
			}
			if (bestMatch.length < 1) {
				for (const [name, pattern] of Object.entries(Patterns.single)) {
					const match = text.remaining.match(pattern);
					if (match) {
						bestMatchName = name;
						bestMatch = match[0];
						break;
					}
				}
			}

			if (!bestMatch) {
				throw new Error("Didn't recognize \"" + text.remaining.slice(0, 30) + '..."');
			}

			tokens.push({
				type: TokenType.ToTokenType(bestMatchName)!,
				value: bestMatch,
			});
			text.advance(bestMatch.length);
		}

		tokens.push({
			type: TokenType.EOF,
			value: TokenType.EOF.name,
		});
		return tokens;
	}
}
