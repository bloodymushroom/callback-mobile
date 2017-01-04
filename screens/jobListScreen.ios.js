import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import {
  AppRegistry, Text, View, TouchableOpacity, 
  ScrollView, Button, TabBarIOS, 
  Modal, WebView
} from 'react-native'
import {NavBar} from '../components/navBar'
import JobListNav from '../components/jobListNav';
import mobx from 'mobx';
import moment from 'moment'
// import './navigation/Router'

var JobInfoModal = (props) => (
  <View style={{marginTop: 50, flex: 1}}>
    <View style={{alignItems: 'flex-end'}}>
      <TouchableOpacity onPress={props.close} style={{margin: 5, marginRight:10, width:20}}>
        <Text style={{textAlign: 'right'}}>x</Text>
      </TouchableOpacity>
    </View>
    <WebView
      source={{uri: props.job.url}}
      style={{flex:1}}
    />
  </View>
)

var NothingToReview = () => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <Text>Nothing to Review!</Text>
    <Text>Maybe it would be a good time to 
      <Text>finish pending tasks.</Text>
    </Text>
    <Text>Already done? 
      <Text> Search for more jobs.</Text>
    </Text>
  </View>
)

@observer
class JobListItem extends Component {
  constructor(props){
    super(props)

    this.closeMoreInfo = this.closeMoreInfo.bind(this)
  }

  showMoreInfo(){
    this.props.navigator.push('jobinfomodal')
  }

  closeMoreInfo(){
    this.props.navigator.pop();
  }

  render() {
    const {jobScreenActiveTab} = Store;
    console.log('job', this.props.job)
    var cleanSnippet = this.props.job.snippet.split('<b>').join('').split('</b>').join('')
    var styles = {
      jobItemStyle: {
        flexDirection: 'column', borderWidth: 2, borderColor: '#a5a2a4', margin: 10, height: 400
      },
      yesButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
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

    var JobInfo = () => (
      <View style={{flex:1, flexDirection: 'column', margin: 10}}> 
        <Text style={{fontSize: 20, margin: 2}}>{this.props.job.company}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25, margin: 2}}>{this.props.job.jobTitle}</Text>
        <Text style={{fontSize: 20, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Date Posted: </Text>
          {moment(this.props.job.createdAt).format('MMMM Do YYYY')}
        </Text>
        <Text style={{fontSize: 20, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Location: </Text>
          {this.props.job.city}, {this.props.job.state}
        </Text>
        <Text style={{fontSize: 20, margin: 2, fontWeight:'bold'}}>Description:</Text>
        <ScrollView style={{height: 200}}>
          <Text style={{fontSize: 15, margin: 2}}>{cleanSnippet}</Text>
        </ScrollView>
        <TouchableOpacity style={{width:100, height:15}} onPress={this.showMoreInfo.bind(this)}>
          <Text style={{color: 'blue', fontSize: 15}}> show more</Text>
        </TouchableOpacity>
      </View>
    )
    if (jobScreenActiveTab === 'Active' || jobScreenActiveTab === 'All') {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo />
        </View>
      )
      // && reviewed === false
    } else if (jobScreenActiveTab === 'Pending') {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo/>
          <TouchableOpacity style={styles.yesButtonStyle} onPress={() => this.props.handleClick('save')}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Save Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButtonStyle} onPress={() => this.props.handleClick('no save')}>
            <Text style={{textAlign: 'center'}}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }
}

// main
@observer
class JobListScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Jobs'
    }
  }

  static navigatorStyle = {
    navBarTextColor: '#A92324',
    navBarBackgroundColor: '#a5a2a4',
    navBarButtonColor: '#000000'
  };

  constructor(props){
    super(props);

    this.state = {
      activeTab: 'Active',
      jobIndex: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  _navigate(next) {
    this.props.navigator.push({
      name: 'hiredly.me'
    })
  }

  handleClick(button) {
    const {jobs} = Store;

    if (button === 'save') {
      // save job and generate next action
    } else {
      // do not save job
    }

    this.setState({
      jobIndex: this.state.jobIndex + 1
    })

    console.log('num: ', this.state.jobIndex, jobs.length)
  }

  componentWillMount() {
    fetch('http://jobz.mooo.com:3000/jobs/1')
        .then((response) => response.json())
        .then((responseJson) => {
          Store.updateJobs(responseJson.Jobs);
        })
        .catch((error) => {
          console.error(error);
        });
  }

          // <JobListItem job={jobs[0]} reviewed={e.reviewed} navigator={this.props.navigator}/>
  render() {
    const {jobs, jobScreenActiveTab} = Store;
    var jobsArray = jobs.slice();
    // console.log('job', jobs[0])
    // e = mobx.toJS(e);

    return (
      <View style={{flex:1, marginTop: 10}}>
        <JobListNav user='Joosang' />
        { this.state.jobIndex > jobs.length - 1 && 
          <NothingToReview />
        }
        <ScrollView>
         { jobs.map( (e, i) => (
             i === this.state.jobIndex && <JobListItem key={i} job={e} reviewed={e.reviewed} handleClick={this.handleClick} navigator={this.props.navigator}/>
         ))}
        </ScrollView>
      </View>
    )
  }
}

// scrolling jobs

module.exports = {JobInfoModal, JobListScreen}