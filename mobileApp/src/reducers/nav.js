import { NavigationActions } from 'react-navigation';
import { Navigator } from '../components/AppNavigator';

const initState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('AuthLoading'));

export const navigation = (state = initState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  return nextState || state;
};