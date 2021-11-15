export default {
  sources: [
    "https://www.youtube.com/watch?v=y6120QOlsfU&list=PLjQBYQ7_FJAWd5DpuMh-wpOCTn-zjalhx", // playlist
    "https://www.youtube.com/watch?v=iR2IuOasSYU",
    "https://www.youtube.com/watch?list=RDGMEM6ijAnFTG9nX1G-kbWBUCJA&start_radio=1", // mix (not supported)
    "https://www.youtube.com/watch?v=TN_beGurqnE", // song
    "https://www.youtube.com/watch?v=88nuQr9M9tw",
  ],
  targetFolder : "export",
  concurrent: 1,
  quality: 'audio', // ['audio', 'video', 'standard']
  cleanTargetFolder: true,
  test: true
};