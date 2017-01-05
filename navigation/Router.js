import {
  createRouter,
} from '@exponent/ex-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import ParamsScreen from '../screens/paramsScreen';
//
import TaskScreen from '../screens/taskScreen';
import {JobListScreen, JobInfoModal} from '../screens/jobListScreen';
import RootNavigation from './RootNavigation';
import CreateParamModal from '../components/createParamModal'

const Router = createRouter(() => ({
  home: () => TaskScreen,
  jobinfomodal: () => JobInfoModal,
  createparammodal: () => CreateParamModal,
  links: () => JobListScreen,
  settings: () => SettingsScreen,
  params: () => ParamsScreen,
  rootNavigation: () => RootNavigation,
}));

export default Router;