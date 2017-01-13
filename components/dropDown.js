import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native'

export default class DropDown2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSelection: 'dropdown',
      active: false
    }

    this._activate = this._activate.bind(this);
  }

  _activate(option, cb) {
    var that = this;

    if (that.state.active){
      console.log('actie click')
      that.setState({
        activeSelection: option,
        active: false
      })

      if (cb) {
        cb(option);
      }
    } else {
      console.log('not active click')
      that.setState({
        active: true
      })
    }
  }



  render() {
    var that = this;
    var options = ['Test1', 'Test2', 'Test3', 'Test4']
    var styles = {
      container: {
        borderWidth: 1, borderColor: '#a5a2a4', width: 300
      },
      entry: {      
        margin: 10
      }
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.entry} onPress={() => that._activate(that.state.activeSelection, that.props.setJobState)}><Text>{that.state.activeSelection}</Text></TouchableOpacity>
        {
          that.state.active && 
          that.props.options.map( (e, i) => (
            <TouchableOpacity key={i} style={styles.entry} onPress={() => that._activate(e, that.props.setJobState)}>
              <Text>{e}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}