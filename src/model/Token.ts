import { TokenType } from "./TokenType";

export default interface Token {
	type: TokenType;
	value: string;
}
