import React, { PureComponent, CSSProperties } from 'react';
import { StyleProp, ViewStyle, Platform } from 'react-native';
import HTML, { AttrType, PassPropsType, ChildrenType } from 'react-native-render-html';
import { encode, decode } from 'he';
import { WebView } from 'react-native-webview';
import { Image, View, Text, withTheme, Theme } from 'shared';
import deepLinking from 'utils/functions/deepLinking';
import { tagsStaticStyles, styles } from './styles';
import CodeHighLight from 'components/CodeHighLight/CodeHighLight';
import CompareImage from 'components/CompareImage/CompareImage';
import { isEmpty } from 'ramda';
import { SCREEN_WIDTH } from 'shared/utils/screen';

interface HtmlViewerProps {
  html: string;
  htmlWrapCssString?: string;
  containerMaxWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  justifyTextEnabled?: boolean;
  tagsStyles?: {
    [key: string]: CSSProperties;
  };
  theme?: Theme;
}
const IOS = Platform.OS === 'ios';

type DefaultProps = Pick<HtmlViewerProps, 'containerMaxWidth' | 'containerStyle' | 'htmlWrapCssString' | 'justifyTextEnabled' | 'tagsStyles'>;

const CONTAINER_PADDING = 10;
const WTF = '<--WTF-->';

class HtmlViewer extends PureComponent<HtmlViewerProps> {
  static defaultProps: DefaultProps = {
    containerMaxWidth: SCREEN_WIDTH,
    containerStyle: {
      // padding: CONTAINER_PADDING,
    },
    htmlWrapCssString: '',
    justifyTextEnabled: false,
    tagsStyles: {},
  };

  _handleLinkPress = (_event: React.MouseEvent, href: string) => {
    deepLinking(href);
  };

  // chỉnh lại react-code-highlight
  _getHTML = () => {
    const { html } = this.props;
    return html
      .replace(/<p><\/p>|\s*(font-family|font-weight)\s*:\s*.+?\s*;\s*/g, '')
      .replace(/<\/code>/g, `${WTF}\n</code>\n\n`)
      .replace(/class=.*react-code-highlight.*([\s\S]*?)(?=<\/code>\n)/g, (match, p1) => {
        return `data-children="${encode(p1)}" ${match}`;
      });
  };

  _renderBlockquote = (_attr: AttrType, children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    const { theme } = this.props;
    return (
      <View key={passProps.key} style={[styles.blockquote, { borderLeftColor: theme?.colors.primary }]}>
        {IOS ? <Text style={styles.blockquoteText}>{children}</Text> : children}
      </View>
    );
  };

  _renderImage = (attr: AttrType, _children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    // const { containerMaxWidth } = this.props;
    // const attrWidth = Number(attr.width);
    // const containerWidth = containerMaxWidth;
    // const width = attrWidth < containerWidth ? attrWidth : containerWidth;
    return <Image zoomEnabled key={passProps.key} uri={attr.src} containerStyle={styles.image} />;
  };

  _renderFigure = (_attr: AttrType, children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    return (
      <View key={passProps.key} tachyons="mb1">
        {children}
      </View>
    );
  };

  _renderFigcaption = (_attr: AttrType, children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    return (
      <Text key={passProps.key} style={styles.figcaption}>
        {children}
      </Text>
    );
  };

  _renderCodeHighLight = (attr: AttrType, _children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    if (attr.class !== 'react-code-highlight') {
      return null;
    }
    const language = attr['data-language'];
    const code = decode(attr['data-children'])
      .trim()
      .replace(WTF, '');
    return (
      <CodeHighLight key={passProps.key} language={language}>
        {code}
      </CodeHighLight>
    );
  };

  _renderCompareImage = (attr: AttrType, children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    if (!attr.class?.includes('react-compare-image')) {
      return children;
    }
    // const { containerMaxWidth } = this.props;
    const beforeImageUri = attr['data-image-before'];
    const afterImageUri = attr['data-image-after'] || beforeImageUri;
    const beforeText = attr['data-before-caption'] || 'Before';
    const afterText = attr['data-after-caption'] || 'After';

    return (
      <CompareImage
        key={passProps.key}
        beforeImageUri={beforeImageUri}
        afterImageUri={afterImageUri}
        beforeText={beforeText}
        afterText={afterText}
        // containerStyle={{ marginLeft: -CONTAINER_PADDING, width: containerMaxWidth }}
      />
    );
  };

  _renderIframe = (attr: AttrType, _children: ChildrenType, _convertedCSSStyles: CSSProperties, passProps: PassPropsType) => {
    const { containerMaxWidth } = this.props;
    if (!attr.src) {
      return null;
    }

    return (
      <WebView
        key={passProps.key}
        javaScriptEnabled
        domStorageEnabled
        source={{
          uri: `${attr.src}${attr.src.includes('?') ? '&' : '?'}autoplay=0`,
        }}
        style={{
          marginLeft: -CONTAINER_PADDING,
          width: containerMaxWidth,
          height: (9 * (containerMaxWidth ?? SCREEN_WIDTH)) / 16,
        }}
      />
    );
  };

  // _renderGallaryGrid = (
  //   attr: AttrType,
  //   children: ChildrenType,
  //   _convertedCSSStyles: CSSProperties,
  //   passProps: PassPropsType,
  // ) => {
  //   // console.log(attr, children);
  //   if (attr.class !== 'blocks-gallery-item') {
  //     return children;
  //   }
  //   return children;
  // };

  render() {
    const { htmlWrapCssString, containerMaxWidth, containerStyle, justifyTextEnabled, tagsStyles, theme, ...otherProps } = this.props;
    const textJustifyStyle = justifyTextEnabled
      ? `
    text-align: justify;
    text-justify: inter-word;`
      : '';
    const _htmlWrapCssString =
      `
      font-size: ${isEmpty(tagsStyles) ? '15' : tagsStyles?.div.fontSize}px;
      line-height: ${isEmpty(tagsStyles) ? '1.6em' : tagsStyles?.div.lineHeight};
      color: ${theme?.colors.dark2};
    ` +
      textJustifyStyle +
      htmlWrapCssString;
    return (
      <HTML
        {...otherProps}
        html={`<div style="${_htmlWrapCssString}">${this._getHTML()}</div>`}
        imagesMaxWidth={containerMaxWidth}
        containerStyle={containerStyle}
        renderers={{
          blockquote: this._renderBlockquote,
          img: this._renderImage,
          figure: this._renderFigure,
          figcaption: this._renderFigcaption,
          code: this._renderCodeHighLight,
          div: this._renderCompareImage,
          iframe: this._renderIframe,
          // li: this._renderGallaryGrid,
        }}
        onLinkPress={this._handleLinkPress}
        tagsStyles={{ ...tagsStaticStyles, a: { color: theme?.colors.primary }, ...tagsStyles }}
      />
    );
  }
}

export default withTheme(HtmlViewer);
