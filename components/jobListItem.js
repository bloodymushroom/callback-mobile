import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import JobInfoModal from './jobInfoModal'
import moment from 'moment'

// state management
import {observer} from 'mobx-react/native'
import Store from '../data/store'


@observer
export default class JobListItem extends Component {
  constructor(props){
    super(props)

    this.closeMoreInfo = this.closeMoreInfo.bind(this)
  }

  showMoreInfo(){
    this.props.navigator.push('jobinfomodal', 
      {
        url: this.props.job.url,
        closeMoreInfo: this.closeMoreInfo
      }
    )
  }

  closeMoreInfo(){
    this.props.navigator.pop();
  }

  render() {
    const {jobScreenActiveTab} = Store;
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
        <Text style={{fontSize: 15, margin: 2}}>{this.props.job.company}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, margin: 2}}>{this.props.job.jobTitle}</Text>
        <Text style={{fontSize: 15, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Date Posted: </Text>
          {moment(this.props.job.createdAt).format('MMMM Do YYYY')}
        </Text>
        <Text style={{fontSize: 15, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Location: </Text>
          {this.props.job.city}, {this.props.job.state}
        </Text>
        <Text style={{fontSize: 15, margin: 2, fontWeight:'bold'}}>Description:</Text>
        <ScrollView style={{height: 200}}>
          <Text style={{fontSize: 15, margin: 2}}>{cleanSnippet}</Text>
          <TouchableOpacity style={{width:100, height:15}} onPress={this.showMoreInfo.bind(this)}>
            <Text style={{color: 'blue', fontSize: 15}}> show more</Text>
          </TouchableOpacity>
        </ScrollView>
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
          <TouchableOpacity style={styles.yesButtonStyle} onPress={() => this.props.handleClick('favor', this.props.job.id, this.props.job)}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Save Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButtonStyle} onPress={() => this.props.handleClick('unfavor', this.props.job.id, this.props.job)}>
            <Text style={{textAlign: 'center'}}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }
}