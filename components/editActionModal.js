import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, 
  Picker
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';
import DatePicker from 'react-native-datepicker'

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

// icons
var icons = {
  hamburger: 'https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/menu_start_taskbar_and_window_panel_list-128.png',
  'phone': 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  'schedule': 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  review: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png',
  'apply': 'https://cdn4.iconfinder.com/data/icons/gray-toolbar-7/512/test-256.png',
  done: 'https://cdn1.iconfinder.com/data/icons/basic-ui-icon-rounded-colored/512/icon-01-128.png',
  x: 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png',
  'connections': 'https://cdn2.iconfinder.com/data/icons/ourea-icons/256/Connected_256x256-32.png',
  'like': 'https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/like-128.png',
  'learn': 'https://cdn0.iconfinder.com/data/icons/thin-science-space/24/thin-1036_brain_thinking_mind_knowledge-128.png',
  'offer': 'https://cdn1.iconfinder.com/data/icons/party-3/500/Party_2-128.png',
  'interview': 'https://cdn4.iconfinder.com/data/icons/office-vol-2-3/48/75-256.png',
  email: 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/mail-128.png',
  sentEmail:'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/mail-128.png',
  receivedEmail:'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/mail-128.png',
  phoneInterview:'https://cdn4.iconfinder.com/data/icons/office-vol-2-3/48/75-256.png',
  personalInterview:'https://cdn4.iconfinder.com/data/icons/office-vol-2-3/48/75-256.png',
  resume: 'https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo2-07-128.png',
  'follow up': 'https://cdn2.iconfinder.com/data/icons/toolbar-icons/512/Return_Arrow-128.png'
}

var displayString = {
  phone: 'Phone call',
  meetup: 'Attend meetup',
  schedule: 'Schedule meeting',
  review: 'Review new jobs',
  apply: 'Apply to job',
  connections: 'Search for connection',
  like: 'Added job',
  learn: 'Learn about company',
  offer: 'Received offer',
  interview: 'Interview',
  phoneInterview: 'Phone Interview',
  personalInterview: 'On-site Interview',
  webInterview: 'Web Interview',
  resume: 'Update your resume',
  'follow up': 'Follow up on application status'
}

export default class EditActionModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'New Action'
    },
  }

  constructor(props) {
    super(props);
    const {activeUserId} = Store;

    var today = new Date().toISOString().slice(0, 19).replace(/T/, ' ');
    console.log('today: ', today);

    this.state = {
      id: this.props.action.id,
      type: this.props.action.type,
      company: this.props.action.company,
      description: this.props.action.description,
      actionSource: 'user',
      JobId: this.props.action.JobId,
      userId: activeUserId,
      contactId: 1,
      selected: null,
      scheduledTime: this.props.action.scheduledTime,
      completedTime: this.props.action.completedTime
    }

    this.closeModal = this.closeModal.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setType = this.setType.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
    this.setState({type: value})
  };

  setType(option) {
    var that = this;
    that.setState({
      type: option
    })
  }

  saveChanges(){
    console.log('new action: ', this.state)
    const {idToken, activeUserId} = Store;
    console.log('index: ', this.props.index);
    var storeAction = Store.activeActionsComputed[this.props.index]
    console.log('store action:', mobx.toJS(storeAction))
    storeAction.description = this.state.description;
    storeAction.scheduledTime = this.state.scheduledTime;
    storeAction.notes = this.state.notes;

    console.log('after edit:', mobx.toJS(storeAction))

    var that = this;

    fetch(config.host +'/actions/' + this.props.action.id, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          credentials: idToken
        },
        body: JSON.stringify(this.state)       
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      console.log('response: ', responseJson);
      this.closeModal();
    })
    .catch(err => console.log(err))
  }

  render() {
    const {actionTypes} = Store;

    var styles = {
      headerStyle: {
        margin: 5, flexDirection: 'row', alignItems: 'flex-end', borderBottomColor: '#F44336', borderBottomWidth: 2
      },
      inputStyle: {
        height: 30, borderColor:"#a5a2a4", borderWidth: 1, padding: 2
      },
      contentWrapperStyle: {
        margin: 10, flexDirection: 'row'
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
            <Text style={{fontSize: 20}}>Edit Action</Text>
          </View>
          <TouchableOpacity onPress={this.closeModal} style={{alignSelf: 'flex-end', margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Action ID:</Text>
            </View>
            <View style={styles.contentStyle}>
              <Text>{this.props.action.id}</Text>
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Action Type:</Text>
            </View>
            <View style={{flex:3, flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}>
              <Image 
                style={{height: 30, width: 30, opacity: 0.8, marginRight: 10}}
                source={{uri: icons[this.props.action.type]}} 
              />
              <Text>{displayString[this.props.action.type]}</Text>
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Company:</Text>
            </View>
            <View style={styles.contentStyle}>
              <Text style={{fontSize: 13}}>{this.props.action.company}</Text>
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Scheduled Time:</Text>
            </View>
            <View style={styles.contentStyle}>
              <DatePicker
                style={{width: 200}}
                date={this.state.scheduledTime}
                mode="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                minuteInterval={10}
                onDateChange={(datetime) => {
                  console.log('datetime in datepicker: ', typeof datetime)
                  this.setState({scheduledTime: datetime});
                }}
              />
            </View>
          </View>          
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Description:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput
                placeholder={this.props.action.description} 
                style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({description: text}) 
                }} 
              /> 
            </View>
          </View>
          <View style={styles.contentWrapperStyle}>
            <View style={styles.labelStyle}>
              <Text style={{fontSize: 13}}>Additional Notes:</Text>
            </View>
            <View style={styles.contentStyle}>
              <TextInput
                placeholder={this.props.action.notes}
                style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({notes: text}) 
                }} 
              /> 
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.createButtonStyle} onPress={this.saveChanges}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    )
  }
}