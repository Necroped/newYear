import fs from 'fs';

import Parser from './Parser';
import YoutubeParser from './Youtube/Parser';
import Song from './Youtube/Song';

const parsers = [
  YoutubeParser
];

class Downloader {

  sources: string[];
  folder: string;
  constructor(sources: string[], destination: string) {
    this.sources = sources;
    this.folder = destination;
    Downloader.createDestination(destination);
  }

  static createDestination(destination: string) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
  }

  static getParser(url: string) {
    for(let Parser of parsers) {
      if(Parser.canParse(url)) {
        return Parser;
      }
    }
    return undefined;
  }

  getParsers(): Parser[] {
    let parsers: Parser[] = [];
    for(let source of this.sources) {
      const parser = Downloader.getParser(source);
      if(parser) {
        parsers = parsers.concat(parser.init(source));
      }
    }
    return parsers.filter(s => s);
  }

  async downloadAll(concurrent: number = 1) {
    const parsers = this.getParsers();
    parsers.forEach(async (parser) => {
      const song: Song = await parser.getSong();
      const destination = this.folder + '/' + song.getOutputPath();
      await song.download().pipe(fs.createWriteStream(destination)
        .on('finish', () => console.log('✓ Finished downloading ' + destination))
        .on('error', () => console.log('✘ Error downloading ' + destination))
      );
    });
  }
}

export default Downloader;