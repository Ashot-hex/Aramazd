export class TokenType {
  private static readonly Map: Map<string, TokenType> = new Map();
  public static get = this.Map.get.bind(this.Map);
  public static getAll() {
    return [...this.Map.keys()];
  }

  private constructor(public readonly name: string) {
    TokenType.Map.set(this.name, this);
  }

  toString() {
    return this.name;
  }

  //#region Ignored
  public static readonly Comment = new TokenType("Comment");
  //#endregion Ignored

  //#region Reserved
  public static readonly Public = new TokenType("Public");
  public static readonly Private = new TokenType("Private");
  public static readonly Class = new TokenType("Class");
  public static readonly Using = new TokenType("Using");
  public static readonly Namespace = new TokenType("Namespace");
  public static readonly Const = new TokenType("Const");
  public static readonly Static = new TokenType("Static");
  public static readonly Readonly = new TokenType("Readonly");
  public static readonly Get = new TokenType("Get");
  public static readonly Set = new TokenType("Set");
  //#endregion Reserved

  //#region Variable
  public static readonly Number = new TokenType("Number");
  public static readonly String = new TokenType("String");
  public static readonly Symbol = new TokenType("Symbol");
  //#endregion Variable

  //#region Double
  public static readonly Inline = new TokenType("Inline");
  //#endregion Double

  //#region Single
  public static readonly OpenBracket = new TokenType("OpenBracket");
  public static readonly CloseBracket = new TokenType("CloseBracket");
  public static readonly OpenCurly = new TokenType("OpenCurly");
  public static readonly CloseCurly = new TokenType("CloseCurly");
  public static readonly OpenParen = new TokenType("OpenParen");
  public static readonly CloseParen = new TokenType("CloseParen");
  public static readonly Semi = new TokenType("Semi");
  public static readonly Plus = new TokenType("Plus");
  public static readonly Star = new TokenType("Star");
  public static readonly Member = new TokenType("Member");
  public static readonly Comma = new TokenType("Comma");
  public static readonly Assignement = new TokenType("Assignement");
  public static readonly OpenSubType = new TokenType("OpenSubType");
  public static readonly CloseSubType = new TokenType("CloseSubType");
  //#endregion Single

  public static readonly EOF = new TokenType("EOF");
}

export const ReservedKeywords = [
  TokenType.Public,
  TokenType.Private,
  TokenType.Class,
  TokenType.Using,
  TokenType.Namespace,
  TokenType.Const,
  TokenType.Static,
  TokenType.Readonly,
  TokenType.Get,
  TokenType.Set,
];
