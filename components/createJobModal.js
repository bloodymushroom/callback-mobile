import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

// store
import mobx from 'mobx';
import {observer} from 'mobx-react/native';
import Store from '../data/store';

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

@observer
export default class CreateJobModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'Jobs'
    },
  }

  constructor(props) {
    super(props)
    const {activeUserId} = Store;

    this.state = {
      userid: activeUserId,
      id: activeUserId,
      jobTitle: null,
      company: null,
      url: null,
      address: null,
      city: null,
      state: null,
      snippet: null,
      source: 'user',
      origin: 'user'
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitFields = this.submitFields.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  submitFields(){
    const {newJob} = Store;
    var newJobJS = mobx.toJS(newJob);
    var that = this;

    console.log('before send: ' , that.state)
    fetch(config.host + '/job', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // need to fix - not working
        body: JSON.stringify(that.state)
      })
      .then((response) => {
        console.log('added a job', that.state)
        Store.push(that.state, 'favoredJobs')
        // Store.push(that.state, 'userParams');
        that.closeModal();
      })
      .catch(err => console.log(err))
    // that.closeModal();
  }

  render() {
    const {newJob} = Store;
    var that = this;
    var styles = {
      inputStyle: {
        flex:1, height: 40, borderColor:"#a5a2a4", borderWidth: 1},
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      }
    }
    return (
      <View style={{flex:1, alignItems:'center', margin: 10}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.closeModal} style={{margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Job Title: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ jobTitle: text})
            }} 
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Company: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ company: text})
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Url: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ url: text})
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Address: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ address: text})
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>City: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ city: text})
            }} 
          />  
          <Text>State: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ state: text})
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Description: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              that.setState({ snippet: text})
            }} 
          />        
        </View>
        <TouchableOpacity style={styles.createButtonStyle} onPress={this.submitFields}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}