import axios from 'axios';

const defaultInfo = {
  width: 16,
  height: 9,
  title: '',
  thumbnail: '',
};

const { CancelToken } = axios;
let ytbCancel: Function | null = null;
let vmCancel: Function | null = null;

async function getYoutubeInfo(src: string): Promise<typeof defaultInfo> {
  try {
    !!ytbCancel && ytbCancel();
    const id = src.replace(/^http.*\?v=|&.*$/g, '');
    const API = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`;
    const { data } = await axios.get(API, {
      cancelToken: new CancelToken(c => {
        ytbCancel = c;
      }),
    });
    const { width, height, title, thumbnail_url: thumbnail } = data;
    return {
      width,
      height,
      title,
      thumbnail,
    };
  } catch (err) {
    return defaultInfo;
  }
}

async function getVimeoInfo(src: string): Promise<typeof defaultInfo> {
  try {
    !!vmCancel && vmCancel();
    const id = src.replace(/^http.*\/|&.*$/g, '');
    const API = `https://noembed.com/embed?url=https://vimeo.com/${id}`;
    const { data } = await axios.get(API, {
      cancelToken: new CancelToken(c => {
        vmCancel = c;
      }),
    });
    const { width, height, title, thumbnail_url: thumbnail } = data;
    return {
      width,
      height,
      title,
      thumbnail,
    };
  } catch (err) {
    return defaultInfo;
  }
}

async function getVideoInfo(src: string) {
  if (src.includes('youtube.com')) {
    const info = await getYoutubeInfo(src);
    return info;
  }
  if (src.includes('vimeo.com')) {
    const info = await getVimeoInfo(src);
    return info;
  }
  return defaultInfo;
}
export default getVideoInfo;
