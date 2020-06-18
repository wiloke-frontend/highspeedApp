import { AttrType } from 'react-native-render-html';

const isClassHtml = (attr: AttrType, className: string) => {
  return attr?.class?.includes(className);
};

export default isClassHtml;
