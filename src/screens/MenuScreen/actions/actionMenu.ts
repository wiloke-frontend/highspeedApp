import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Menu } from 'api/Menu';
import { MenuEndpoint } from 'api/Endpoint';

export const getMenu = createAsyncAction(['@getMenuRequest', '@getMenuSuccess', '@getMenuFailure'])<
  { endpoint: MenuEndpoint },
  Menu['data'],
  string
>();

export const useGetMenuRequest = createDispatchAction(getMenu.request);
