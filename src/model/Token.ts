import { Pos } from "../lexing/Pos";
import { TokenType } from "./TokenType";

export interface IToken {
  type: TokenType;
  value: string;
  pos: Pos;
}
export class Token implements IToken {
  public constructor(private token: IToken) {}

  get type() {
    return this.token.type;
  }
  get value() {
    return this.token.value;
  }
  get pos() {
    return this.token.pos;
  }

  isAnyOf(...types: TokenType[]) {
    return types.includes(this.type);
  }

  toString(): string {
    return `{ ${this.type.name}: "${this.value}" }`;
    // return `{ ${this.type.name}: "${this.value}" } at { ln: ${this.pos.line}, col: ${this.pos.col} }`;
  }
  simplify(): object {
    return { [this.type.name]: this.value };
  }
}
