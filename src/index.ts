import Downloader from './Downloader';

import config from './config';

(async () => {
  const downloader = new Downloader(config.sources, config.destination);
  await downloader.downloadAll(config.concurrent);
})();