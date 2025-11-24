import { writeFileSync } from "fs";
import { Stmt } from "../model/Ast";
import { createTokenLookups } from "../model/Lookups";
import { IToken, Token } from "../model/Token";
import { TokenType } from "../model/TokenType";
import { parse_stmt } from "./Statement";
import { createTokenTypeLookups } from "./Type";

export class Parser {
  public setTokens(tokens: IToken[]) {
    this.pos;
    this.tokens = tokens.map((t) => new Token(t));
  }

  constructor(private tokens: Token[] = [], private pos: number = 0) {}
  public clone() {
    return new Parser(this.tokens, this.pos);
  }
  advanceUntil(type: TokenType): Token {
    while (this.currentTokenType != type) {
      this.advance();
    }
    return this.currentToken;
  }

  private get close() {
    return this.tokens.slice(this.pos - 3, this.pos + 3);
  }

  public parse(): Stmt {
    const body: Stmt[] = [];
    try {
      while (this.hasTokens) {
        body.push(parse_stmt());
      }

      return {
        body,
      };
    } catch (error: any) {
      const [past, curr, next] = [
        this.tokens.slice(0, this.pos),
        [this.currentToken],
        this.tokens.slice(this.pos),
      ].map((x) => x.map((xx) => xx.simplify()));
      writeFileSync(
        "error.json",
        JSON.stringify({
          //   body,
          past,
          next,
          error: {
            message: error?.message ?? error,
            on: curr,
            stack: error?.stack?.split("\n") ?? undefined,
          },
        }),
        {
          encoding: "utf-8",
        }
      );
      throw error;
    }
  }

  // HELPER METHODS
  get currentToken(): Token {
    return this.tokens[this.pos];
  }

  get posInText(): string {
    return JSON.stringify(this.currentToken.pos).replaceAll('"', "");
  }

  get currentTokenType(): TokenType {
    return this.currentToken.type;
  }

  advance(): Token {
    const tk = this.currentToken;
    this.pos++;
    return tk;
  }

  get hasTokens(): boolean {
    return (
      this.pos < this.tokens.length && this.currentTokenType != TokenType.EOF
    );
  }

  expect(expected: TokenType, err: string | undefined = undefined): IToken {
    const type = this.currentTokenType;
    if (expected != type) {
      throw new Error(
        err ?? `Expected ${expected} but recieved ${type.name} instead.`
      );
    }

    return this.advance();
  }

  preview(...types: TokenType[]): boolean {
    const checked = this.tokens.slice(this.pos, this.pos + types.length);
    const res = checked.every((val, ix) => val.isAnyOf(types[ix]));

    return res;
  }

  peek(expected: TokenType): Token | null {
    return this.currentTokenType == expected ? this.advance() : null;
  }
}

createTokenLookups();
createTokenTypeLookups();
export const parser = new Parser();
