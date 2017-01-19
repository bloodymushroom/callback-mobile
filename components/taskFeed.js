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
  }

  // componentWillMount(){
  //   var tasks = mobx.toJS(Store.actions)
  //   this.setState({
  //     feedTasks: tasks
  //   })
  // }
  render() {
    var style = {
      titleBar: {
        borderRadius: 5, marginBottom: 10, backgroundColor: '#0277BD'
      }
    }
    const {actions, activeActions, actionHistory} = Store;
    var actionsArray = this.props.category === 'Tasks'? mobx.toJS(actions): mobx.toJS(actionHistory).sort((a, b) => this.compareDates(a.completedTime, b.completedTime));
    // this.props.category === 'History'? console.log('history constant actions', actionsArray): true;
    var that = this;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', margin: 5}}>
        <View style={style.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3, color: 'white'}}>{this.props.category}</Text>
        </View>
        {
          activeActions.length === 0 && 
          <Text>No pending actions. Add a job to generate activities.
          </Text>
        }
        <ScrollView style={style.feed}>
          {activeActions.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
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
