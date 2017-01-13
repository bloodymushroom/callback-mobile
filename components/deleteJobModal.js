import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

//dropdown

// store
import mobx from 'mobx';
import {observer} from 'mobx-react/native';
import Store from '../data/store';

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

@observer
export default class DeleteJobModal extends Component {
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

    this.state = {
      jobTitle:   null,
      company:    null,
      url:        null, 
      address:    null,
      city:       null,
      state:      null,
      snippet:    null,
      origin:     'user',
      userid:     1
    }

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  submitFields(){
    const {newJob} = Store;
    var newJobJS = mobx.toJS(newJob);
    var that = this;
    console.log('before send: ' , that.state)
    fetch(config.host + '/jobs', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // need to fix - not working
        body: JSON.stringify({
          id: 1,
          jobTitle: 'testfromPhone',
          company: 'Test',
          snippet: 'testestest'
        })
      })
      .then((response) => {
        that.closeModal();
      })
  }

  render() {
    const {newJob} = Store;
    var styles = {
      inputStyle: {
        flex:1, height: 40, borderColor:"#a5a2a4", borderWidth: 1},
      // createButtonStyle: {
      //   backgroundColor: '#4286f4',
      //   borderRadius: 25,
      //   margin: 5,
      //   padding: 10
      // }
      noButtonStyle: {
        borderColor:"#A92324",
        borderWidth: 2,
        borderRadius: 25,
        margin: 5,
        marginTop: 0,
        padding: 10
      }
    }
    return (
      <View style={{flex:1, alignItems:'center', margin: 10}}>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.closeModal} style={{margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>ID: {this.props.route.params.job.id}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Job Title: {this.props.route.params.job.jobTitle}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Company: {this.props.route.params.job.jobTitle}</Text>      
        </View>
        <Text>Please select a reason for deleting this job:</Text>

        <TouchableOpacity style={styles.noButtonStyle}>
          <Text style={{textAlign: 'center'}}>Remove this job</Text>
        </TouchableOpacity>
      </View>
    )
  }
}