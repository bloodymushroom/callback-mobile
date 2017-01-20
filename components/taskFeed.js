import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import TaskFeedItem from './taskFeedItem';
import {observer} from 'mobx-react/native';
import Store from '../data/store';
import mobx from 'mobx';
import moment from 'moment';


// feed for pending tasks and history
@observer
export default class TaskFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedTasks: null
    }

    this.forceRerender = this.forceRerender.bind(this);
  }

  forceRerender() {
    console.log('forced?')
    this.forceUpdate();
  }

  render() {
    var style = {
      titleBar: {
        borderRadius: 5, marginBottom: 10, backgroundColor: '#0277BD'
      }
    }
    // const {actions, activeActions, actionHistory} = Store;
    var that = this;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', margin: 5}}>
        <View style={style.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3, color: 'white'}}>{this.props.category}</Text>
        </View>
        {
          Store.activeActionsComputed.length === 0 && 
          <Text>No pending actions. Add a job to generate activities.
          </Text>
        }
        <ScrollView style={style.feed}>
          {Store.activeActionsComputed.map( (e, i) => {
            console.log('is there an index? ', i)
            return <TaskFeedItem navigator={this.props.navigator} category={that.props.category} task={e} key={i} index={i}/>
          })}
        </ScrollView>
      </View>
    )
  }
}
// { this.props.category === 'Tasks' &&
//   <ScrollView style={style.feed}>
//     {activeActions.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
//   </ScrollView>
// }
// { this.props.category === 'History' &&
//   <ScrollView style={style.feed}>
//     {actionHistory.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
//   </ScrollView>
// }
