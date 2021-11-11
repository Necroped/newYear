"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = __importDefault(require("../Parser"));
const Playlist_1 = __importDefault(require("./Playlist"));
const Song_1 = __importDefault(require("./Song"));
const DOMAINS = [
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'music.youtube.com',
    'gaming.youtube.com',
];
class YoutubeParser extends Parser_1.default {
    constructor(url) {
        super(url);
        this.name = 'Youtube';
    }
    getSong() {
        return Song_1.default.init(this.url);
    }
    static canParse(url) {
        return DOMAINS.some(domain => url.includes(domain));
    }
    static init(url) {
        if (Playlist_1.default.isValid(url)) {
            return [];
        }
        else if (Song_1.default.isValid(url)) {
            return [new YoutubeParser(url)];
        }
        return [];
    }
}
exports.default = YoutubeParser;
