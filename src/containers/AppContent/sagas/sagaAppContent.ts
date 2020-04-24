import { watchTabNavigator } from './watchTabNavigator';
import watchGetNotificationTotal from './watchNotificationTotal';

const sagaAppContent = [watchTabNavigator, watchGetNotificationTotal];

export default sagaAppContent;
