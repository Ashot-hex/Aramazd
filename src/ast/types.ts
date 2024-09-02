import { Type } from "./ast"

export class SymbolType extends Type {
    public constructor(
        private value: string
    ) { super(); }
}

export class ListType extends Type {
    public constructor(
        private underlying: Type
    ) { super(); }
}