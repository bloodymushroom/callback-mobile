import {observable, action, computed} from 'mobx'
import data from './fakeData'
import mobx from 'mobx';
import moment from 'moment'

class ObservableStore {
  //access tokens
  @observable idToken;

  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  @observable activeUserId = 1;
  //actions
  @observable actions = [];
  @observable actionTypes = {
    apply: 'apply', connections: 'connections', email: 'email', interview:'interview',
    learn: 'learn', 'like': 'like', meetup: 'meetup', offer: 'offer',
    phone: 'phone', resume: 'resume', review: 'review', schedule: 'schedule'
  };
  // new jobs
  @observable jobs = [];
  // @observable jobCount = 0;
  // activeJobs = user's favored jobs
  @observable favoredJobs = [];
  // @observable favoredJobCount = favoredJobs.length;
  @observable jobScreenActiveTab = 'Active';
  @observable jobModalUrl = '';
  // parameters
  @observable userParams = [];
  // new form items
  // @observable newJob = {
  //   jobTitle: '',
  //   company: '',
  //   url: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   snippet: '',
  //   source: 'user',
  //   origin: 'user',
  //   id: undefined
  // }

  @action setIdToken(token){
    console.log('set token')
    this.idToken = token;
  }

  @action setState(key, value){
    console.log('set key')
    console.log('this in setstate', this)
    this[key] = value;
  }

  @action updateForm(formName, formField, item) {
    if (formName === 'newJob') {
      this.newJob[formField] = item;
    }
  }

  @action changeJobScreenTab(tabName) {
    console.log('this in changeJobScreenTab', this)
    this.jobScreenActiveTab = tabName;
    // console.log('jobs: ', this.jobs)
  }

  // general
  @action push(entry, array){
    this[array].push(entry);
  }

  @action deleteFromArray(id, array){
    var i = 0;
    while (i < this[array].length){
      if (this[array][i].id === id) {
        this[array].splice(i, 1);
        console.log('i', i)
        break;
      } else {
        i++;
      }
    }
  }

  // not used
  @action completeAction(id){
    console.log('action completed');
    for (var i = 0; i < this.actions.length; i++){
      if (this.actions[i].id === id){
        this.actions[i].completedTime = new Date();
      }
      return;
    }

    this.deleteFromArray(id, 'activeActionsComputed')
  }

  // deletes a job ID and all actions associated with job
  @action deleteJob(id) {
    this.deleteFromArray(id, 'favoredJobs');

    var i = 0;
    while(i < this.actions.length) {
      if (this.actions[i].JobId === id) {
        this.actions.splice(i, 1);
        console.log('i', i, 'jobId:', id)
      } else {
        i++;
      }
    }
  }

  // update all user's past and present actions, sorts by scheduled time
  @action updateActions(actions) {
    var that = this;
    this.activeActions = [];
    this.actionHistory = [];

    // sort by time
    this.actions = actions
    .sort((a, b) => {
      if (a.scheduledTime < b.scheduledTime) {
        return -1;
      } else if (a.scheduledTime > b.scheduledTime) {
        return 1;
      }

      return 0;
    });
  }

  @computed get activeActionsComputed() {
    var ret = [];

    this.actions.forEach((action, index) => {
      if (!action.completedTime) {
        ret.push(action);
      }
    })

    return ret;
  }

  @computed get completedActionsComputed() {
    var ret = [];

    this.actions.forEach((action, index) => {
      if (action.completedTime) {
        ret.push(action);
      }
    })

    return ret;
  }
}

const observableStore = new ObservableStore();
export default observableStore;