import {observer} from 'mobx-react/native'
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, WebView, Image} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

export default class JobInfoModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    }
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{marginTop: 50, flex: 1}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.props.route.params.closeMoreInfo} style={{margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: this.props.route.params.url}}
          style={{flex:1}}
        />
      </View>
    )
  }
} 
