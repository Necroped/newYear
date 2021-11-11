import Song from "./Youtube/Song";

class Parser {

  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getSong(): Promise<Song>  {
    throw new Song('', { artist: '', title: '' });
  }

  parse(): Promise<Song>[] {
    return [];
  }

  static init(url: string): Parser[] {
    return [new Parser(url)];
  }

}

export default Parser;