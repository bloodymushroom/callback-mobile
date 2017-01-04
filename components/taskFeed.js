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


// feed for pending tasks and history
@observer
class TaskFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedTasks: null
    }
  }

  componentWillMount(){
    var tasks = mobx.toJS(Store.actions)
    console.log('current actions', mobx.toJS(Store.actions));
    this.setState({
      feedTasks: tasks
    })
    console.log(this.state.feedTasks);
    // fetch('http://jobz.mooo.com:5000/actions/1')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log('response', responseJson)
    //     Store.updateActions(responseJson);
    //     console.log('store', Store.actions)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  render() {
    var style = {
      titleBar: {
        borderWidth: 2, borderColor: '#a5a2a4', marginBottom: 10
      }
    }
    const {actions} = Store;
    var actionsArray = mobx.toJS(actions);
    console.log('constant actions', actionsArray)
    var that = this;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', margin: 5}}>
        <View style={style.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3}}>{this.props.category}</Text>
        </View>
        <ScrollView style={style.feed}>
          {actionsArray.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
        </ScrollView>
      </View>
    )
  }
}

module.exports = TaskFeed;