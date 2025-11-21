"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
class Text {
    _remaining;
    constructor(_remaining) {
        this._remaining = _remaining;
        this._remaining = _remaining.trim();
    }
    get remaining() {
        return this._remaining;
    }
    get atEOF() {
        return this.remaining.length === 0;
    }
    advance(n = 1) {
        if (!this.atEOF) {
            this._remaining = this._remaining.slice(n).trim();
        }
    }
}
exports.Text = Text;
//# sourceMappingURL=Text.js.map