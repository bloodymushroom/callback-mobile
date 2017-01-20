import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView
} from 'react-native'

export default class DropDown2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSelection: '',
      active: false,
      height: this.props.height || 200
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
        borderWidth: 1, borderColor: '#a5a2a4', width: 250
      },
      entry: {      
        margin: 5
      }
    }
    return (
      <View style={styles.container}>
        { this.state.activeSelection !== '' &&
          <TouchableOpacity style={styles.entry} onPress={() => that._activate(that.state.activeSelection, that.props.setThisState)}><Text>{that.state.activeSelection}</Text></TouchableOpacity>
        }
        { this.state.activeSelection === '' && 
        <TouchableOpacity style={styles.entry} onPress={() => that._activate(that.state.activeSelection, that.props.setThisState)}>
          <Text style={{fontStyle: 'italic'}}>Click to select...</Text>
        </TouchableOpacity>
        }

        {
          that.state.active && 
          <ScrollView style={{height: this.state.height}}>
            {that.props.options.map( (e, i) => (
              <TouchableOpacity key={i} style={styles.entry} onPress={() => that._activate(e, that.props.setThisState)}>
                <Text>{e}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
      </View>
    )
  }
}