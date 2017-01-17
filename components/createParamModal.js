import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'
var icons = {
  loading: 'https://am.jpmorgan.com/baurl-gim/image/ajax-loader.gif'
}

@observer
export default class CreateParamModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'Preferences'
    },
  }

  constructor(props) {
    super(props)


    this.state = {
      descriptor: null,
      city: null,
      state: null,
      radius: 25,
      zip: null,
      loading: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitFields = this.submitFields.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  submitFields(){
    const {activeUserId, idToken} = Store;
    var that = this;
    console.log('before send: ' , that.state)
    fetch(config.host + '/parameter/' + activeUserId, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: idToken
        },
        body: JSON.stringify({
          descriptor: that.state.descriptor,
          city: that.state.city,
          state: that.state.state,
          radius: that.state.radius,
          zip: that.state.zip
        })
      })
      .then((response) => {
        // find new jobs
        Store.push(that.state, 'userParams');
        that.setState({
          loading: true
        })
        fetch(config.host + '/jobs/' + activeUserId + '/new', {
          headers: {
            credentials: Store.idToken
          }
        })
          .then((response) => {
            // console.log('jobs found: ', response)
            console.log('config', config.host)
            return response.json();
          })
          .then((responseJson) => {
            console.log('jobsnew found: ', responseJson.length - Store.jobCount)
            Store.updateJobCount(responseJson.length);
            Store.updateJobs(responseJson);
            that.setState({
              loading: false
            })
            Alert.alert('Added ' + (responseJson.length - Store.jobCount) + ' new jobs');
            that.closeModal();
          })
          .catch((error) => {
            console.error(error);
          });
        // that.closeModal();
      })
    // that.closeModal();
  }

  render() {
    var that = this;
    var styles = {
      inputStyle: {
        height: 40, borderColor:"#a5a2a4", borderWidth: 1
      },
      contentWrapperStyle: {
        margin: 5, marginTop: 10, flexDirection: 'row'
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
    if (this.state.loading) {
      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', margin: 10, alignItems: 'center'}}>
          <Image 
            style={{height: 20, width: 20}}
            source={{uri: icons.loading}}
          />
          <Text>Finding new jobs...</Text>
        </View>
      )
    } else {
      return (
        <View style={{flex:1, margin: 10}}>
          <View style={{flexDirection: 'column',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={this.closeModal} style={{alignSelf: 'flex-end', margin: 5, marginRight:10, width:20}}>
              <Image 
                style={{height: 20, width: 20}}
                source={{uri: x}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentWrapperStyle}>
            <Text style={{fontSize: 20}}>New Job Search Parameter</Text>
          </View> 

          <View style={{flex:1, marginTop: 20, alignItems: 'center', flexDirection: 'column'}}>

            <View style={styles.contentWrapperStyle}>
              <View style={styles.labelStyle}>
                <Text style={{fontSize: 15}}>Job Type:</Text>
              </View>
              <View style={styles.contentStyle}>
                <TextInput style={styles.inputStyle} 
                  onChangeText={(text) => {
                    this.setState({descriptor: text}) 
                  }} 
                /> 
              </View>
            </View>

            <View style={styles.contentWrapperStyle}>
              <View style={{flex:3, flexDirection: 'row', marginRight: 10}}>
                <Text>City: </Text>
                <TextInput style={styles.inputStyle} flex={1}
                  onChangeText={(text) => {
                    that.setState({ city: text})
                  }} 
                />  
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text>State: </Text>
                <TextInput style={styles.inputStyle} flex={1}
                  onChangeText={(text) => {
                    that.setState({ state: text})
                  }} 
                />
              </View>
            </View>

            <View style={styles.contentWrapperStyle}>
              <View style={styles.labelStyle}>
                <Text style={{fontSize: 15}}>Job Radius:</Text>
              </View>
              <View style={styles.contentStyle}>
                <TextInput style={styles.inputStyle} 
                  onChangeText={(text) => {
                    this.setState({radius: text}) 
                  }} 
                /> 
              </View>
              <View style={{alignSelf: 'center', marginLeft: 10, width: 70}}>
                <Text>(miles)</Text>
              </View>
            </View>

            <View style={styles.contentWrapperStyle}>
              <View style={styles.labelStyle}>
                <Text style={{fontSize: 15}}>Zipcode:</Text>
              </View>
              <View style={styles.contentStyle}>
                <TextInput style={styles.inputStyle} 
                  onChangeText={(text) => {
                    this.setState({zip: text}) 
                  }} 
                /> 
              </View>
              <View style={{alignSelf: 'center', marginLeft: 10, width: 70}}>
                <Text>(optional)</Text>
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
}