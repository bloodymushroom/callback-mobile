// currently not used; replaced by react-native-navigation component;

import React, { Component } from 'react'
import {
  Text,
  View,
  Image, TouchableOpacity
} from 'react-native';

var icons = {
  hamburger: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png',
  phone: 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  schedule: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  swipe: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png',
  apply: 'https://cdn1.iconfinder.com/data/icons/education-set-01/512/finished-task-128.png',
  settings: 'https://cdn1.iconfinder.com/data/icons/material-core/20/settings-128.png',
  back: 'https://cdn4.iconfinder.com/data/icons/chat-app-icon/36/back_2-128.png'
}

// my custom navbar
class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.currentScreen === 'hiredly.me') {
      return (
        <View style={{height: 50, flexDirection: 'row', backgroundColor: '#a5a2a4', paddingTop: 15}}>
          <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
            <Image style={{height: 20, width: 20, margin: 2.5}} source={{uri: icons.hamburger}} />
          </TouchableOpacity>  
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#A92324'}}>{this.props.currentScreen}</Text>      
          </View>
          <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
            <Image style={{height: 20, width: 20, margin: 2.5}} source={{uri: icons.settings}} />
          </TouchableOpacity>  
        </View>
      )
    } else {
      return (
        <View style={{height: 50, flexDirection: 'row', backgroundColor: '#a5a2a4', paddingTop: 15}}>
          <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
            <Text>Back</Text>
          </TouchableOpacity>  
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#A92324'}}>{this.props.currentScreen}</Text>      
          </View>
          <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
            <Image style={{height: 20, width: 20, margin: 2.5}} source={{uri: icons.settings}} />
          </TouchableOpacity>  
        </View>
      )
    }
  }
}

// built in react-native navbar - CURRENTLY USING
var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (route.name === 'hiredly.me') {
      return (
        <TouchableOpacity style={{alignItems: 'center'}} >
          <Image style={{height: 25, width: 25, margin: 2.5, marginLeft: 10}} source={{uri: icons.hamburger}} />
        </TouchableOpacity> 
      )
    } else {
      return(
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigator.pop()} >
          <Image style={{height: 25, width: 25, margin: 2.5, marginLeft: 10}} source={{uri: icons.back}} />
        </TouchableOpacity> 
      )
    }
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{alignItems: 'center'}} >
        <Image style={{height: 25, width: 25, margin: 2.5, marginRight: 10}} source={{uri: icons.settings}} />
      </TouchableOpacity> 
    )
  },
  Title(route, navigator, index, navState) {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 25, color: '#A92324', margin: 2.5}}>{route.name}</Text>      
      </View>
    )
  }
}

module.exports = {NavBar, NavigationBarRouteMapper};