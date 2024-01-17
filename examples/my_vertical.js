/* eslint-disable no-restricted-syntax */
import editly from '../index.js';
import { getZoomPanEffect } from '../zoompan/zoompan.js';

// TODO test data
const resolution = 'bd';
const aspectRatio = '9:16';
const videos = [
  {
    wavUrl: './examples/input/1.wav',
    srtTexts: '1\n00:00:00,000 --> 00:00:02,998\n时泽宇同样在关注着今天的比赛\n\n2\n00:00:02,998 --> 00:00:05,997\n先后输给龙空空和子桑琉荧之后\n\n3\n00:00:05,997 --> 00:00:10,120\n他整个人的气质似乎都发生了一些变化\n\n4\n00:00:10,120 --> 00:00:11,244\n相比于之前\n\n5\n00:00:11,244 --> 00:00:12,744\n显得内敛了许多\n\n',
    mediaUrls: [
      './examples/input/1.png',
    ],
    effectName: 'zoom-in',
    wavDuration: 12.744,
  },
  {
    wavUrl: './examples/input/2.wav',
    srtTexts: '1\n00:00:00,000 --> 00:00:03,024\n屿桐柔声道，这是你的比赛\n\n',
    mediaUrls: [
      './examples/input/2.png',
    ],
    effectName: 'zoom-out',
    wavDuration: 3.024,
  },
  {
    wavUrl: './examples/input/3.wav',
    srtTexts: '1\n00:00:00,000 --> 00:00:02,712\n我来那就不是真正的你了\n\n',
    mediaUrls: [
      './examples/input/3.png',
    ],
    effectName: 'pan-left',
    wavDuration: 2.712,
  },
  {
    wavUrl: './examples/input/4.wav',
    srtTexts: '1\n00:00:00,000 --> 00:00:02,088\n屿桐淡淡地开口\n\n',
    mediaUrls: [
      './examples/input/4.png',
    ],
    effectName: 'pan-right',
    wavDuration: 2.088,
  },
];
// END

const resolutions = {
  // 高清，720p
  'hd_16:9': [1280, 720, 32],
  'hd_9:16': [720, 1280, 32],
  // 超清，1080p
  'bd_16:9': [1920, 1080, 52],
  'bd_9:16': [1080, 1920, 52],
  // 2k
  '2k_16:9': [2560, 1440, 72],
  '2k_9:16': [1440, 2560, 72],
  // 4k
  '4k_16:9': [3840, 2160, 92],
  '4k_9:16': [2160, 3840, 92],
};

const transitions = ['fade', 'Radial', 'angular', 'ripple'];

const resCconfig = resolutions[`${resolution}_${aspectRatio}`];

editly({
  width: resCconfig[0],
  height: resCconfig[1],
  fps: 30,
  outPath: './examples/output/vertical_video.mp4',
  defaults: {
    transition: {
      name: transitions[0],
      duration: 0.25,
    },
  },
  clips: videos.map((video) => ({
    duration: video.wavDuration,
    layers: [
      { type: 'audio', path: video.wavUrl },
      { type: 'canvas', func: getZoomPanEffect(video, resCconfig[2]) },
    ],
  })),
  keepTmp: false,
  loopAudio: true,
  keepSourceAudio: true,
  onProgress: (p) => {
    console.log('>>> progress =', p);
  },
}).catch(console.error);