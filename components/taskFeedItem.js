import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import moment from 'moment'

// state management
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import mobx from 'mobx'
import config from '../constants/Routes'


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
  edit: 'http://icons.iconarchive.com/icons/pixelkit/gentle-edges/128/Edit-icon.png',
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
  email: 'Email',
  sentEmail: 'Sent Email',
  receivedEmail: 'Received Email',
  webInterview: 'Web Interview',
  resume: 'Update your resume',
  'follow up': 'Follow up on application status'
}

// each item in the task feed
@observer
class TaskFeedItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      // task details
      id: this.props.task.id,
      user_id: this.props.task.UserId,
      job_id: this.props.task.JobId,
      scheduled_time: this.props.task.scheduledTime,
      completed_time: this.props.task.completedTime,
      from_today: null,
      display_date: null,
      action_type: this.props.task.actionSource,
      action: this.props.task.type,
      // can be task.description
      action_details: this.props.task.description,
      companyName: this.props.task.company,
      // task item style
      borderColor: '#16C172',
      backgroundColor: '#ffffff'
    }

    this.setItemStyle = this.setItemStyle.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.openJobActionView = this.openJobActionView.bind(this);
    this.openEditActionModal = this.openEditActionModal.bind(this);
    this.calculateDays = this.calculateDays.bind(this);

  }

  openJobActionView(){
    if (this.props.jobId) {
      return;
    }

    var that = this;
    var jobView = Store.findJob(this.props.task.JobId);
    this.props.navigator.push('jobactionview', {
      job: jobView
    });
  }

  openEditActionModal(){
    var that = this;
    // var jobView = Store.findJob(this.props.task.JobId);
    // console.log('found: ',jobView)
    this.props.navigator.push('editactionmodal', {
      action: this.props.task,
      index: this.props.index
    });
  }

  shouldShow(){
    if ((this.props.category === 'Tasks' && !this.props.task.completedTime) 
      || (this.props.category === 'History' && !!this.props.task.completedTime)) {
      if (this.props.jobId) {
        if (this.props.jobId === this.props.task.JobId) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  completeTask() {
    const {idToken, activeUserId} = Store;
    var date = new Date();
    var completedText = "Completed task: " + this.props.task.type + '\n';
    // var nextTask = "Next Task: (example) \ndue " + moment(date).format('MMMM Do YYYY')
    var that = this;

    // put request to database to set action's completed time to now
    fetch(config.host + '/actions/' + activeUserId + '/' + this.props.task.id, {
      method: 'PUT',
      headers: {
        credentials: idToken     
      }
    })
    .then((response) => {
        return response.json()
    })
    .then(function(response) {
        Alert.alert(completedText);
      
      // reset actions from DB since db spawns new actions base on previous completed action
      fetch(config.host+ '/actions/' + activeUserId, 
      {
        headers: {
          credentials: idToken
        }
      })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          Store.updateActions(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  setItemStyle(time, completed) {
    // yellow border if due today

    if (completed) {      
      this.setState ({
        borderColor: '#a5a2a4',
        backgroundColor: '#ffffff'
      })
    } else {
      if (time === 0) {
        this.setState({
          borderColor: '#F8CF46'
        })
      } else if (time < 0) {
        // if not completed and overdue, highlight red
        this.setState ({
          borderColor: '#d66a63',
          backgroundColor: '#d66a63'
        })
      }
    } 
  }

  calculateDays() {
    var now = moment();
    var dueDate = moment(this.props.task.scheduledTime);
    var diff = dueDate.diff(now, 'days')
    var displayDate;

    // use diff to determine the display date in the task item
    if (this.props.task.completedTime) {
      var completedDate = moment(this.props.task.completedTime)
      diff = completedDate.diff(now, 'days');
      displayDate = diff === 0? 'today' : (diff * -1 === 1? '1 day ago': diff * -1 + ' days ago'); 
    } else {
      if (diff < 0) {
        displayDate = 'over due';
      } else if (diff === 0) {
        displayDate = 'today';
      } else if (diff === 1) {
        displayDate = diff + ' day';
      } else {
        displayDate = diff + '\ndays';
      }
    }

    // add props for time relative to today and display date
    this.setState({
      from_today: diff,
      display_date: displayDate,
      icon: icons[this.props.task.type],
    })

    this.setItemStyle(diff, this.props.task.completedTime)
  }

  componentWillMount() {
    // using momentJS, find the difference between now and the scheduled due date in terms of days
    // store in variable diff
    this.calculateDays();
  }

  render() {
    // console.log('this task: ', mobx.toJS(this.props.task))
    // var jobNext = Store.findJob(this.props.task.JobId)
    var style = {
      barStyle: {flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderRadius: 5,
      padding: 2, marginTop: 2, borderColor: this.state.borderColor, backgroundColor: this.state.backgroundColor
      },
      checkboxStyle: {width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}
    }

    if (this.shouldShow()) {
      return (
        <View style={style.barStyle}>
          <View style={{width: 40}}><Text style={{textAlign: 'center'}}>{this.state.display_date}</Text></View>
          <View style={{width: 50}}><Image 
            style={{height: 35, width: 35, margin: 5}}
            source={{uri: this.state.icon}} 
          /></View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>{displayString[this.props.task.type]}</Text>
            <TouchableOpacity onPress={this.openJobActionView}>
              <Text display={this.props.task.company}>{this.props.task.company}</Text>
            </TouchableOpacity>
          </View>
        { this.props.category === 'Tasks' &&
        <View style={{justifyContent: 'center'}}>
          <View style={style.checkboxStyle}>
            <TouchableOpacity onPress={this.completeTask}>  
              <Image 
                style={{height: 30, width: 30, opacity: 0.5}}
                source={{uri: icons.done}} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openEditActionModal}>
              <Image 
                style={{height: 30, width: 30, opacity: 0.5}}
                source={{uri: icons.edit}} 
              />
            </TouchableOpacity>
          </View>
        </View>
        }
        </View>
      )
    } 
    else {
      return null
    }
  }
}

/*add these props for testing 
*/

module.exports = TaskFeedItem;
            // <Text>Task ID: {this.props.task.id}</Text>
            // <Text>Prop Job:{this.props.jobId}</Text>
            // <Text>State Job:{this.state.job_id}</Text>
            // <Text>Scheduled time: {this.props.task.scheduledTime}</Text>