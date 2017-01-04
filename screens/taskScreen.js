/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image, 
  Button,
} from 'react-native';
import moment from 'moment'
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import {NavBar} from '../components/navBar'
import TaskStatusItem from '../components/taskStatusItem'
import TaskStatus from '../components/taskStatus'
import TaskFeed from '../components/taskFeed'
// import data from '../data/fakeData'

// import {Nav} from 'react-bootstrap'

// variables
var testTaskTypes = [ 
  { type: 'Open Tasks', count: 8 }, 
  { type: 'Recently Completed Tasks', count: 23 }, 
  { type: 'Companies to Review', count: 5 } 
]

var icons = {
  hamburger: 'https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/menu_start_taskbar_and_window_panel_list-128.png',
  phone: 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  interview: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  review: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png'
}

var icons = {
  hamburger: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png',
  settings: 'https://cdn1.iconfinder.com/data/icons/material-core/20/settings-128.png'
}

@observer
export default class TaskScreen extends Component {
  static route = {
    navigationBar: {
      title: 'home'
    },
    rightButtons: [
      {
        title: 'Settings',
        id: 'settings',
        icon: require('../icons/settings.png'),
      }
    ],
    leftButtons: [
      {
        id: 'menu',
        icon: require('../icons/hamburger.png')
      }
    ]
  }
  // styling the navigation bar
  static navigatorStyle = {
    navBarTextColor: '#A92324',
    navBarBackgroundColor: '#a5a2a4',
    navBarButtonColor: '#000000'
    // navBarHidden: true
  };

  // add buttons to NavBar
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Settings',
        id: 'settings',
        icon: require('../icons/settings.png'),
      }
    ],
    leftButtons: [
      {
        id: 'menu',
        icon: require('../icons/hamburger.png')
      }
    ]
  }

  componentWillMount() {
    fetch('http://jobz.mooo.com:5000/actions/1')
      .then((response) => response.json())
      .then((responseJson) => {
        Store.updateActions(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _navigate(next) {
    this.props.navigator.push({
      name: next
    })
  }

  // add <NavBar /> component to view to see custom NavBar
  render() {
    const {actions} = Store;
    return(
      <View style={{flex: 1, flexDirection: 'column', marginTop:10}}>
        <TaskStatus user='Joosang' taskTypes={testTaskTypes} navigator={this.props.navigator}/>
        <View style={{flex: 1}}>
          <TaskFeed category='Tasks' tasks={actions}/>
          <TaskFeed category='History' tasks={actions}/>
        </View>
      </View>
    )
  }
}
