import React, { PureComponent } from 'react';
import Video from 'components/Video/Video';
import getVideoInfo from './getVideoInfo';

interface YtbAndVimeoVideoProps {
  uri: string;
}

interface YtbAndVimeoVideoState {
  thumbnail: string;
}

class YtbAndVimeoVideo extends PureComponent<YtbAndVimeoVideoProps, YtbAndVimeoVideoState> {
  state: YtbAndVimeoVideoState = {
    thumbnail: '',
  };

  async componentDidMount() {
    const { uri } = this.props;
    const { thumbnail } = await getVideoInfo(uri);
    this.setState({
      thumbnail,
    });
  }

  render() {
    const { uri } = this.props;
    const { thumbnail } = this.state;
    return <Video uri={uri} thumbnailUri={thumbnail} thumbnailPreview={thumbnail} tachyons={['mb3', 'br3', 'overflowHidden']} />;
  }
}

export default YtbAndVimeoVideo;
