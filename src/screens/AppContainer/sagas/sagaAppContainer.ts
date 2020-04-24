import { watchTabNavigator } from './watchTabNavigator';
import watchGetNotificationTotal from './watchNotificationTotal';

const sagaAppContainer = [watchTabNavigator, watchGetNotificationTotal];

export default sagaAppContainer;
