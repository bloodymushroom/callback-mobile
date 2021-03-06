import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

//dropdown
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
import DropDown2 from './dropDown'

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
      status: 'favored'
    }

    this.closeModal = this.closeModal.bind(this);
    this._setJobState = this._setJobState.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  _getOptionsList() {
    return this.refs['OPTIONLIST'];
  }

  _setJobState(newStatus){
    this.setState({
      status: newStatus
    })
  }

  submitFields(){
    const {newJob, idToken} = Store;
    var newJobJS = mobx.toJS(newJob);

    var that = this;
    fetch(config.host + '/jobs', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: idToken

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
      .catch((err) => {
        console.log(err);
        that.closeModal();
      })
  }

  deleteJob() {
    var that = this;
    const {jobs, activeUserId, idToken} = Store;
    var jobId = this.props.route.params.job.id;
    // need to change unfavored to dropdown status
    fetch( config.host + '/users/' + activeUserId +'/jobs/' + jobId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        credentials: idToken
      },
      body: JSON.stringify({
        status: 'rejected'
      })
    })
    .then((response) => {
      Store.deleteJob(jobId);
      that.closeModal();
    })
    .catch((err) => {
      console.log('error')
      that.closeModal();
    })
  }

  render() {
    const {newJob} = Store;
    var deleteReasons = [
      'No longer interested',
      'No longer posted',
      'No response from employer',
      'Application rejected',
      'Re-apply at a later time',
      'Other'
    ]

    var styles = {
      headerStyle: {
        margin: 5, flexDirection: 'row', alignItems: 'flex-end', borderBottomColor: '#F44336', borderBottomWidth: 2
      },
      inputStyle: {
        flex:1, height: 30, borderColor:"#a5a2a4", borderWidth: 1
      },
      contentWrapperStyle: {
        flex:1, margin: 10, marginTop: 10, flexDirection: 'row'
      },
      labelStyle: {
        flex:1, alignItems: 'flex-start'
      },
      contentStyle: {
        flex:3, marginLeft: 10
      },
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
      <View style={{flex:1, margin: 10}}>
        <View style={styles.headerStyle}>
          <View style={{flex: 1, margin: 5, marginLeft: 10}}>
            <Text style={{fontSize: 20}}>Delete Job</Text>
          </View>
          <TouchableOpacity onPress={this.closeModal} style={{alignSelf: 'flex-end', margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex:1, alignItems: 'center', flexDirection: 'column'}}>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Job ID:</Text>
            </View>
            <View style={styles.contentStyle}>
              <Text style={{fontSize: 13}}>{this.props.route.params.job.id}</Text>
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Job Title:</Text>
            </View>
            <View style={styles.contentStyle}>
              <Text style={{fontSize: 13}}>{this.props.route.params.job.jobTitle}</Text>
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Company:</Text>
            </View>
            <View style={styles.contentStyle}>
              <Text style={{fontSize: 13}}>{this.props.route.params.job.company}</Text>
            </View>
          </View>
        </View>
        <View style={{flex:2, flexDirection: 'column', justifyContent: 'flex-start', margin:10, marginTop: 20}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize:13, fontWeight:'bold'}}>Please select a reason for deleting this job:</Text>
          </View>
          <DropDown2 options={deleteReasons} setThisState={this._setJobState}/>
        </View>

        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={this.deleteJob} style={styles.noButtonStyle}>
            <Text style={{textAlign: 'center'}}>Remove this job</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}