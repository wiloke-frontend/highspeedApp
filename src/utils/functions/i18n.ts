import { I18n } from 'react-redux-i18n';
import { translations } from 'translations';

interface I18nType {
  t: (code: keyof typeof translations.en, options?: any) => string;
  l: (timestamp: number, options?: any) => string;
}

const i18n: I18nType = I18n;

export default i18n;
