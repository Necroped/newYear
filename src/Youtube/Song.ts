import { Stream } from 'stream';
import ytdl from 'ytdl-core';

interface SongMeta {
  artist ?: string,
  title ?: string
}

const cleanName = (name: string): string => {
  return name.replaceAll(' ', '_').replaceAll('/', '');
}

class Song {

  artist: string | undefined;
  title: string | undefined;
  url: string;
  format: any;
  constructor(url: string, { artist, title }: SongMeta, format?: ytdl.videoFormat) {
    if(!url) throw new Error('No url provided');
    this.url = url;
    this.artist = artist;
    this.title = title;
    this.format = format;
  }

  static isValid(url: string): boolean {
    return ytdl.validateURL(url);
  }

  static async init(url: string): Promise<Song> {
    const infos = await ytdl.getInfo(url);
    const { videoDetails: { author: { name }, media: { artist, song }, title }, formats } = infos;
    console.log(infos.videoDetails)
    const format = ytdl.chooseFormat(formats, { quality: 'highestaudio' });
    return new Song(url, { artist: artist || name, title: song || title }, format);
  }

  getOutputPath(): string {
    return `${this.artist ? '[' + cleanName(this.artist) + ']' : ''}${this.title ? cleanName(this.title) : ''}.${this.format.container}`
  }

  download(): Stream {
    return ytdl(this.url, { format: this.format });
  }

}

export default Song;