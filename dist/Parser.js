"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Song_1 = __importDefault(require("./Youtube/Song"));
class Parser {
    constructor(url) {
        this.url = url;
    }
    getSong() {
        throw new Song_1.default('', { artist: '', song: '' });
    }
    parse() {
        return [];
    }
    static init(url) {
        return [new Parser(url)];
    }
}
exports.default = Parser;
