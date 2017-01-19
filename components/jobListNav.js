import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import { View, Text, TouchableOpacity } from 'react-native'

class JobListNav extends Component {
  onTabClick(e, name) {
    Store.changeJobScreenTab(name)
  }

  render() {
    const {jobScreenActiveTab, activeUser} = Store;
    var userMessage = {
      Active: 'your active applications',
      Pending: 'the jobs you need to review',
      All: 'all available jobs'
    }
    var styles = {
      activeButton: {
        flex: 1, backgroundColor: '#F44336', margin: 4, padding: 5, borderRadius: 5
      },
      inactiveButton: {
        flex: 1, backgroundColor: '#a5a2a4', margin: 5, padding: 5, borderRadius: 5
      },
      activeText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
      },
      inactiveText: {
        textAlign: 'center',
        color: 'black'
      }
    }

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{margin: 5}}>
          <Text>Hi <Text style={{fontWeight: 'bold'}}>{activeUser}</Text>, here are {userMessage[jobScreenActiveTab]}.</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Pending')} style={Store.jobScreenActiveTab === 'Active'? styles.inactiveButton: styles.activeButton} >
            <Text style={Store.jobScreenActiveTab === 'Active'? styles.inactiveText: styles.activeText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Active')} style={Store.jobScreenActiveTab !== 'Active'? styles.inactiveButton: styles.activeButton} >
            <Text style={Store.jobScreenActiveTab !== 'Active'? styles.inactiveText: styles.activeText}>Active</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

//All Tab
//<TouchableOpacity id='allTab' onPress={(event) => this.onTabClick(event, 'All')} style={styles.tabStyle} >
//  <Text style={{textAlign: 'center'}}>All</Text>
//</TouchableOpacity>

module.exports = JobListNav;