import React, {Component} from 'react';
import {
  AppRegistry, Text, View, ScrollView,  
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

//
import JobInfoModal from '../components/jobInfoModal'
import JobListItem from '../components/jobListItem'
import JobListNav from '../components/jobListNav'

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'


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
    fetch('http://jobz.mooo.com:5000/jobs/1', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'new'
      })
    })
        .then((response) => {
          // console.log('jobs found: ', response)
          return response.json()
        })
        .then((responseJson) => {
          console.log('jobs found: ', responseJson)
          Store.updateJobs(responseJson);
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