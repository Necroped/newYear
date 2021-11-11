import ytpl from 'ytpl';

class Playlist {

  static isValid(url: string): boolean {
    return ytpl.validateID(url)
  }

}

export default Playlist;