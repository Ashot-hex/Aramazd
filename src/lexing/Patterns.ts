import { TokenType } from "../model/TokenType";

const Patterns = {
	ignored: {
		Comment: /^\/\/[^\n^\r]*/,
	},

	variable: {
		Symbol: /^\w+/,
		Number: /^(\d*.)?\d+m?/,
		String: /^"[^"]*"/,
	},

	double: {
		InlineBody: /^\=\>/,
		LessOrEqual: /^\<\=/,
		GreaterOrEqual: /^\>\=/,
		Equal: /^\=\=/,
		NotEqual: /^\!\=/,
		And: /^\&\&/,
		Or: /^\|\|/,
		Coalesce: /^\|\|/,
		DotDot: /^\.\./,
	},

	single: {
		OpenParen: /^\(/,
		CloseParen: /^\)/,
		OpenBrace: /^\{/,
		CloseBrace: /^\}/,
		OpenBracket: /^\[/,
		CloseBracket: /^\]/,
		LessThan: /^\</,
		GreaterThan: /^\>/,
		Member: /^\./,
		Comma: /^\,/,
		Semi: /^\;/,
		Plus: /^\+/,
		Dash: /^\-/,
		Star: /^\*/,
		Slash: /^\//,
		Assign: /^\=/,
		TernaryIf: /^\?/,
		TernaryElse: /^\:/,
		LogicalAnd: /^\&/,
		LogicalOr: /^\|/,
		Not: /^\!/,
	},
};

export default Patterns;

function checkValidity() {
	const patterns: string[] = Object.values(Patterns).flatMap((p) => Object.keys(p));
	const errors: string[] = [];

	for (const p of patterns) {
		if (!TokenType.ToTokenType(p)) {
			errors.push(p);
		}
	}

	if (errors.length) {
		throw new Error("Patterns Not matching with Tokens :" + JSON.stringify(errors, null, 2));
	}
}
checkValidity();