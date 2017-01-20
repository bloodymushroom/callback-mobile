import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import TaskFeedItem from '../components/taskFeedItem'
import { NavigationStyles } from '@exponent/ex-navigation';

//
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

@observer
export default class JobActionView extends Component {

  constructor(props){
    super(props);

    this.addAction = this.addAction.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Actions'
    }
  }

  addAction(array, action) {
    this.props.navigator.push('createactionmodal', {
      jobId: this.props.job.id,
      company: this.props.job.company,
      title: this.props.job.jobTitle
    })

    console.log('jobid', this.props.job.id)
  }

  render() {
    var styles = {
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      },
      titleBar: {
        borderRadius: 5, marginBottom: 10, backgroundColor: '#0277BD'
      }
    }

    const {actions, activeActions, actionHistory} = Store;    // var activeActionsJS = mobx.toJS(Store.activeActions.slice())
    var id = this.props.route.params.job.id;
    
    return(
      <View style={{flex: 1, flexDirection: 'column', margin:5}}>
        <View style={{margin: 5}}>
          <Text>Job ID: {id}</Text>
          <Text style={{fontSize: 15, marginTop: 5}}>{this.props.route.params.job.company}</Text>
          <Text style={{fontSize: 20, marginTop: 5}}>{this.props.route.params.job.jobTitle}</Text>
          <Text style={{fontSize: 13, marginTop: 5}}>Description: {this.props.route.params.job.snippet}..</Text>
        </View>
        <View style={styles.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3, color: 'white'}}>Pending Tasks</Text>
        </View>
        <View style={{flex:1}}>
          <ScrollView>
          {
            Store.activeActionsComputed.map( (e, i) => (
              <TaskFeedItem jobId={id} category='Tasks' task={e} key={i}/>
            ))
          }
          </ScrollView>
          {
            Store.activeActionsComputed.length === 0 && <View><Text>No pending actions for this job.</Text></View>
          }
        </View>
        <TouchableOpacity onPress={this.addAction} style={styles.createButtonStyle}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Add Action</Text>
        </TouchableOpacity>
      </View>
    )
  }
}