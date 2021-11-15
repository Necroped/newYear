import Downloader from './Downloader';
import config from './config';

(async () => {
  const downloader = new Downloader(config.targetFolder);
  const urls = await downloader.downloadAll(config.sources);
})();