"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const cleanName = (name) => {
    return name.replaceAll(' ', '_').replaceAll('/', '');
};
class Song {
    constructor(url, { artist, title }, format) {
        if (!url)
            throw new Error('No url provided');
        this.url = url;
        this.artist = artist;
        this.title = title;
        this.format = format;
    }
    static isValid(url) {
        return ytdl_core_1.default.validateURL(url);
    }
    static async init(url) {
        const infos = await ytdl_core_1.default.getInfo(url);
        const { videoDetails: { author: { name }, media: { artist, song }, title }, formats } = infos;
        console.log(infos.videoDetails);
        const format = ytdl_core_1.default.chooseFormat(formats, { quality: 'highestaudio' });
        return new Song(url, { artist: artist || name, title: song || title }, format);
    }
    getOutputPath() {
        return `${this.artist ? '[' + cleanName(this.artist) + ']' : ''}${this.title ? cleanName(this.title) : ''}.${this.format.container}`;
    }
    download() {
        return (0, ytdl_core_1.default)(this.url, { format: this.format });
    }
}
exports.default = Song;
