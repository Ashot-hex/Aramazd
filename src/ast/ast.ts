export abstract class Statement {
    protected constructor(
        private _subinstance_name: string
    ) { }
    public get name(): string { return this._subinstance_name; };

    public statement(): void { }

    public static expect<T extends Statement>(
        stmt: Statement,
        ctor: { new(...args: any[]): T }
    ): T {
        return expect(stmt, ctor);
    }
}
export abstract class Expression {
    protected constructor(
        private _name: string
    ) { }
    public get name(): string { return this._name; };

    public expression(): void { }

    public static expect<T extends Expression>(
        expr: Expression,
        ctor: { new(...args: any[]): T }
    ): T {
        return expect(expr, ctor);
    }
}
export abstract class Type {
    public type(): void { }
}

function expect<T extends { name: string }>(
    received: { name: string },
    expected: { new(...args: any[]): T }
): T {

    if (expected.name !== received.name) {
        throw new Error(`Expected ${expected.name} but received ${received.name}`);
    }

    return received as T;
}