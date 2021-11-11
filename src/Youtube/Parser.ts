import Parser from '../Parser';

import Playlist from './Playlist';
import Song from './Song';

const DOMAINS = [
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'gaming.youtube.com',
];

class YoutubeParser extends Parser {

  name: string = 'Youtube';
  constructor(url: string) {
    super(url);
  }

  getSong(): Promise<Song> {
    return Song.init(this.url);
  }

  static canParse(url: string): boolean {
    return DOMAINS.some(domain => url.includes(domain));
  }

  static init(url: string): Parser[] {
    if (Playlist.isValid(url)) {
      return [];
    } else if (Song.isValid(url)) {
      return [new YoutubeParser(url)];
    }
    return [];
  }

}


export default YoutubeParser;