import React, { FC } from 'react';
import HtmlViewer, { HtmlViewerProps } from './HtmlViewer';

const HtmlViewerImageLoading: FC<HtmlViewerProps> = props => {
  return <HtmlViewer {...props} imageLoading />;
};

export default HtmlViewerImageLoading;
