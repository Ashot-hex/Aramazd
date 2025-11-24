export class TokenType {
	private static readonly Map: Map<string, TokenType> = new Map();
	private constructor(public readonly name: string) {
		TokenType.Map.set(this.name, this);
	}

	public toString(): string {
		return this.name;
	}

	public static ToTokenType(name: string): TokenType | undefined {
		return this.Map.get(name);
	}

	public static readonly Comment = new TokenType("Comment");
	public static readonly Symbol = new TokenType("Symbol");
	public static readonly Number = new TokenType("Number");
	public static readonly Float = new TokenType("Float");
	public static readonly String = new TokenType("String");
	public static readonly InlineBody = new TokenType("InlineBody");
	public static readonly LessOrEquals = new TokenType("LessOrEquals");
	public static readonly GreaterOrEquals = new TokenType("GreaterOrEquals");
	public static readonly Equals = new TokenType("Equals");
	public static readonly NotEquals = new TokenType("NotEquals");
	public static readonly And = new TokenType("And");
	public static readonly Or = new TokenType("Or");
	public static readonly Coalesce = new TokenType("Coalesce");
	public static readonly OpenParen = new TokenType("OpenParen");
	public static readonly CloseParen = new TokenType("CloseParen");
	public static readonly OpenBrace = new TokenType("OpenBrace");
	public static readonly CloseBrace = new TokenType("CloseBrace");
	public static readonly OpenBracket = new TokenType("OpenBracket");
	public static readonly CloseBracket = new TokenType("CloseBracket");
	public static readonly LessThan = new TokenType("LessThan");
	public static readonly GreaterThan = new TokenType("GreaterThan");
	public static readonly Member = new TokenType("Member");
	public static readonly Comma = new TokenType("Comma");
	public static readonly Semi = new TokenType("Semi");
	public static readonly Plus = new TokenType("Plus");
	public static readonly Dash = new TokenType("Dash");
	public static readonly Star = new TokenType("Star");
	public static readonly Slash = new TokenType("Slash");
	public static readonly Assign = new TokenType("Assign");
	public static readonly TernaryIf = new TokenType("TernaryIf");
	public static readonly TernaryElse = new TokenType("TernaryElse");
	public static readonly LogicalAnd = new TokenType("LogicalAnd");
	public static readonly LogicalOr = new TokenType("LogicalOr");
	public static readonly Not = new TokenType("Not");
	public static readonly DotDot = new TokenType("DotDot");
	public static readonly Percent = new TokenType("Percent");

	public static readonly EOF = new TokenType("EOF");
}
