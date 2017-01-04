import {
  createRouter,
} from '@exponent/ex-navigation';

import SettingsScreen from '../screens/SettingsScreen';
//
import TaskScreen from '../screens/taskScreen';
import {JobListScreen, JobInfoModal} from '../screens/jobListScreen';
import RootNavigation from './RootNavigation';

const Router = createRouter(() => ({
  home: () => TaskScreen,
  jobinfomodal: () => JobInfoModal,
  links: () => JobListScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));

export default Router;