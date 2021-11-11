"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytpl_1 = __importDefault(require("ytpl"));
class Playlist {
    static isValid(url) {
        return ytpl_1.default.validateID(url);
    }
}
exports.default = Playlist;
