import fs from 'fs';

import Parsers from './Parser/index'
import config from './config';
import ora from 'ora';

class Downloader {

  folder: string;
  constructor(destination: string) {
    this.folder = destination;
    Downloader.prepareTargetFolder(destination);
  }

  static prepareTargetFolder(path: string) {
    if(config.cleanTargetFolder && fs.existsSync(path)) {
      fs.rmSync(path, { recursive : true });
    }
    if(!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
  }

  static getParser(url: string) {
    for(let Parser of Parsers) {
      if(Parser.canParse(url)) {
        return Parser;
      }
    }
    return undefined;
  }


  async downloadAll(sources: string[]) {
    for(let source of sources) {
      const Parser = Downloader.getParser(source);
      if(Parser) {
        const parser = new Parser(source);
        const urls = await parser.getUrls();
        for(let url of urls) {
          const spinner = ora(`Getting infos for "${url}"`).start();
          const song = await parser.getSong(url);
          spinner.text = `"${song.text}"`;
          try {
            await parser.download(song, this.folder)
            spinner.succeed(`"${song.text}"`);
          } catch(e) {
            spinner.fail(`"${song.text}" : [${e}]`);
          }
        }
      }
    };
  }

}

export default Downloader;