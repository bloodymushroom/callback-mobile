import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'


export default class CreateParamModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'Preferences'
    },
  }

  closeModal() {
    this.props.navigator.pop();
  }

  constructor() {
    super()
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.closeModal} style={{margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text></Text>
          <TextInput></TextInput>
        </View>
      </View>
    )
  }
}