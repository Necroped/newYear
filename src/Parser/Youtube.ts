import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import fs from 'fs';
import path from 'path';

import config from '../config';
import { cleanName } from '../utils';


interface SongMeta {
  url: string,
  artist ?: string,
  title ?: string,
  format ?: ytdl.videoFormat,
  text : string
  path : string
}

enum Quality {
  audio = 'highestaudio',
  video = 'highestvideo',
  standard = 'highest'
}

const DOMAINS = [
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'gaming.youtube.com',
];

class YoutubeParser {

  url: string;
  quality: Quality;
  name: string = 'Youtube';
  constructor(url: string) {
    this.url = url;
    this.quality = YoutubeParser.getQuality();
  }

  static canParse(url: string): boolean {
    return DOMAINS.some(domain => url.includes(domain));
  }

  static getQuality(): Quality {
    if(config.quality === 'audio') return Quality.audio;
    if(config.quality === 'video') return Quality.video;
    return Quality.standard;
  }

  isPlaylist(): boolean {
    return ytpl.validateID(this.url)
  }
  isSong(): boolean {
    return ytdl.validateURL(this.url);
  }

  async getSong(url: string): Promise<SongMeta> {
    const { videoDetails: { author: { name }, media: { artist, song }, title }, formats } = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(formats, { quality: this.quality });
    const metadata = {
      artist: artist || name,
      title: song || title,
      url
    }

    return {
      ...metadata,
      text: `[${metadata.artist}] ${metadata.title}`,
      path: `${metadata.artist ? '[' + cleanName(metadata.artist) + ']' : ''}${metadata.title ? cleanName(metadata.title) : ''}.${format.container}`,
      format: format
    }
  }

  async getUrlsFromPlaylist(): Promise<string[]> {
    if(!this.isPlaylist()) {
      throw new Error('Invalid playlist url');
    }
    const playlist = await ytpl(this.url);
    return playlist.items.map(item => item.shortUrl);
  }

  async getUrls() : Promise<string[]> {
    if (this.isPlaylist()) {
      return this.getUrlsFromPlaylist();
    } else if (this.isSong()) {
      return [this.url]
    }
    return [];
  }

  async download(song: SongMeta, folder: string = '') {
    if(config.test) {
      return ytdl(song.url, { format: song.format, range: { end: 2} })
      .pipe(fs.createWriteStream(path.join(folder, song.path)));
    }
    return ytdl(song.url, { format: song.format })
      .pipe(fs.createWriteStream(path.join(folder, song.path)));
  }

}

export default YoutubeParser;
export { SongMeta };