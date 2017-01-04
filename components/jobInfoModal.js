import {observer} from 'mobx-react/native'
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, WebView} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';


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
            <Text style={{textAlign: 'right'}}>x</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: 'http://www.indeed.com/viewjob?jk=63f6adb4003fdbc0&qd=2D1SbNY9kR4nE7Vic078uECecHLgaHZkognc9Aw3-lq00Y2_gj98roOEvZ5dcskX_mVwn7KCs8LzIkVagHRsj7Mf_ojsScrcTKRH8kxZPkyQhwggWUZEvHtN5OcDtAPb&indpubnum=3095704304706909&atk=1b4uog094afm28nb'}}
          style={{flex:1}}
        />
      </View>
    )
  }
} 