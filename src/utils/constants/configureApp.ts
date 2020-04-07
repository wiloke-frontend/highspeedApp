import configureAppJson from '../../../configureApp.json';

type ConfigureAppJsonType = typeof configureAppJson;

type ConfigureAppJsonSettingsType = ConfigureAppJsonType['settings'];

interface SettingsType extends ConfigureAppJsonSettingsType {
  tabNavigator: 'default' | 'material';
}

interface ConfigureAppType extends ConfigureAppJsonType {
  settings: SettingsType;
}

// @ts-ignore
const configureApp: ConfigureAppType = configureAppJson;

export default configureApp;
