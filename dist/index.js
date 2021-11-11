"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Downloader_1 = __importDefault(require("./Downloader"));
const config_1 = __importDefault(require("./config"));
(async () => {
    const downloader = new Downloader_1.default(config_1.default.sources, config_1.default.destination);
    await downloader.downloadAll(config_1.default.concurrent);
})();
