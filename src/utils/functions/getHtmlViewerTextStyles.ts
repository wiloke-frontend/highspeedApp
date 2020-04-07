const CONSTANT_LINE_HEIGHT = 1.37;
const CONSTANT_H1 = 2.2;
const CONSTANT_H2 = 2;
const CONSTANT_H3 = 1.75;
const CONSTANT_H4 = 1.6;
const CONSTANT_H5 = 1.4;
const CONSTANT_H6 = 1.3;

const getHtmlViewerTextStyles = (size: number, colorPrimary: string) => {
  return {
    div: {
      fontSize: size,
      lineHeight: size * CONSTANT_LINE_HEIGHT,
    },
    h1: {
      fontSize: size * CONSTANT_H1,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H1,
      marginBottom: 10,
    },
    h2: {
      fontSize: size * CONSTANT_H2,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H2,
      marginBottom: 10,
    },
    h3: {
      fontSize: size * CONSTANT_H3,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H3,
      marginBottom: 10,
    },
    h4: {
      fontSize: size * CONSTANT_H4,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H4,
      marginBottom: 10,
    },
    h5: {
      fontSize: size * CONSTANT_H5,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H5,
      marginBottom: 10,
    },
    h6: {
      fontSize: size * CONSTANT_H6,
      lineHeight: size * CONSTANT_LINE_HEIGHT * CONSTANT_H6,
      marginBottom: 10,
    },
    figcaption: {
      fontSize: size,
      lineHeight: size * CONSTANT_LINE_HEIGHT,
      fontStyle: 'italic',
      opacity: 0.8,
    },
    a: {
      color: colorPrimary,
    },
    ul: {
      marginLeft: -15,
      marginTop: 4,
    },
    li: {
      marginTop: -2,
    },
  };
};

export default getHtmlViewerTextStyles;
