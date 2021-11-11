"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Parser_1 = __importDefault(require("./Youtube/Parser"));
const parsers = [
    Parser_1.default
];
class Downloader {
    constructor(sources, destination) {
        this.sources = sources;
        this.folder = destination;
        Downloader.createDestination(destination);
    }
    static createDestination(destination) {
        if (!fs_1.default.existsSync(destination)) {
            fs_1.default.mkdirSync(destination);
        }
    }
    static getParser(url) {
        for (let Parser of parsers) {
            if (Parser.canParse(url)) {
                return Parser;
            }
        }
        return undefined;
    }
    getParsers() {
        let parsers = [];
        for (let source of this.sources) {
            const parser = Downloader.getParser(source);
            if (parser) {
                parsers = parsers.concat(parser.init(source));
            }
        }
        return parsers.filter(s => s);
    }
    async downloadAll(concurrent = 1) {
        const parsers = this.getParsers();
        parsers.forEach(async (parser) => {
            const song = await parser.getSong();
            const destination = this.folder + '/' + song.getOutputPath();
            await song.download().pipe(fs_1.default.createWriteStream(destination)
                .on('finish', () => console.log('✓ Finished downloading ' + destination))
                .on('error', () => console.log('✘ Error downloading ' + destination)));
        });
    }
}
exports.default = Downloader;
