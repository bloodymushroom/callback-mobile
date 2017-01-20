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
    const {newJob, idToken} = Store;
    var newJobJS = mobx.toJS(newJob);
    var that = this;

    fetch(config.host + '/job', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: idToken       
        },
        // need to fix - not working
        body: JSON.stringify(that.state)
      })
      .then((response) => {
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
      headerStyle: {
        margin: 5, flexDirection: 'row', alignItems: 'flex-end', borderBottomColor: '#F44336', borderBottomWidth: 2
      },
      inputStyle: {
        height: 30, borderColor:"#a5a2a4", borderWidth: 1
      },
      contentWrapperStyle: {
        margin: 10, marginTop: 10, flexDirection: 'row'
      },
      labelStyle: {
        flex:1, alignItems: 'flex-start'
      },
      contentStyle: {
        flex:3, marginLeft: 10
      },
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      }
    }
    return (
      <View style={{flex:1, margin: 10}}>
        <View style={styles.headerStyle}>
          <View style={{flex: 1, margin: 5, marginLeft: 10}}>
            <Text style={{fontSize: 20}}>Create Job</Text>
          </View>
          <TouchableOpacity onPress={this.closeModal} style={{alignSelf: 'flex-end', margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>


        <View style={{flex:1, alignItems: 'flex-start', flexDirection: 'column', marginTop: 10}}>

          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Job Title:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({jobTitle: text}) 
                }} 
              /> 
            </View>
          </View>


          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Company:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({company: text}) 
                }} 
              /> 
            </View>
          </View>



          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Website/Link:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({url: text}) 
                }} 
              /> 
            </View>
          </View>

          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Address:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({address: text}) 
                }} 
              /> 
            </View>
          </View>

        <View style={styles.contentWrapperStyle}>
          <View style={{flex:3, flexDirection: 'row', marginRight: 10}}>
            <Text style={{fontSize: 13}}>City: </Text>
            <TextInput style={styles.inputStyle} flex={1}
              onChangeText={(text) => {
                that.setState({ city: text})
              }} 
            />  
          </View>
          <View style={{flex:2, flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>State: </Text>
            <TextInput style={styles.inputStyle} flex={1}
              onChangeText={(text) => {
                that.setState({ state: text})
              }} 
            />
          </View>
        </View>

          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Description:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({snippet: text}) 
                }} 
              /> 
            </View>
          </View>

        </View>
        <TouchableOpacity style={styles.createButtonStyle} onPress={this.submitFields}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}