import {observable, action, computed} from 'mobx'
import data from './fakeData'
import mobx from 'mobx';

class ObservableStore {
  //access tokens
  @observable idToken;

  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  @observable activeUserId = 1;
  //actions
  @observable actions = [];
  @observable activeActions = [];
  @observable actionHistory = [];
  @observable actionCount = 0;
  @observable actionHistoryCount = 0;
  @observable actionTypes = {
    apply: 'apply', connections: 'connections', email: 'email', interview:'interview',
    learn: 'learn', 'Liked Job': 'Liked Job', meetup: 'meetup', offer: 'offer',
    phone: 'phone', resume: 'resume', review: 'review', schedule: 'schedule'
  };
  // new jobs
  @observable jobs = [];
  @observable jobCount = 0;
  // activeJobs = user's favored jobs
  @observable favoredJobs = [];
  // @observable favoredJobCount = favoredJobs.length;
  @observable jobScreenActiveTab = 'Active';
  @observable jobModalUrl = '';
  // parameters
  @observable userParams = [];
  // new form items
  @observable newJob = {
    jobTitle: '',
    company: '',
    url: '',
    address: '',
    city: '',
    state: '',
    snippet: '',
    source: 'user',
    origin: 'user',
    id: undefined
  }

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

  // update new jobs
  @action updateJobs(jobs) {
    this.jobs = jobs;
  }

  @action updateJobCount(n) {
    if (n !== undefined) {
      this.jobCount = n;
    } else {
      this.jobCount++;
    }
  }

  // delete job and all actions associated with job
  @action deleteJob(id) {
    this.deleteFromArray(id, 'favoredJobs');

    var i = 0;
    // while(i < this.actions.length) {
    //   if (this.actions[i].JobId === id) {
    //     this.actions.splice(i, 1);
    //     console.log('i', i)
    //   } else {
    //     i++;
    //   }
    // }
    while(i < this.activeActions.length) {
      if (this.activeActions[i].JobId === id) {
        this.activeActions.splice(i, 1);
        this.activeActionCount--;
        console.log('i', i, 'jobId:', id)
      } else {
        i++;
      }
    }
  }

  // update user's favored jobs
  @action updateFavoredJobs(jobs) {
    this.favoredJobs = jobs;
  }

  //push to favored jobs
  @action addFavoredJob(job) {
    this.favoredJobs.push(job);
  }

  // actions
  @action updateActions(actions) {
    this.actions = actions;
  }

  @action updateActionCount(n) {
    if (n !== undefined) {
      if (n === '-' && this.actionCount > 0) {
        this.actionCount--;
      } else {      
        this.actionCount = n;
      }
    } else {
      this.actionCount++;
    }
  }

  @action updateHistoryCount(n) {
    if (n !== undefined) {
      if (n === '-' && this.actionHistoryCount > 0) {
        this.actionHistoryCount--;
      } else {      
        this.actionHistoryCount = n;
      }
    } else {
      this.actionHistoryCount++;
    }
  }

  @action sortActions(res) {
    var that = this;
    console.log('this in sortActions', this)
    res.forEach(function(action) {
      // if(action.type) {
      //   if(!that.actionTypes[action.type]) {
      //     that.actionTypes[action.type] = action.type;
      //   }
      // }

      if (action.completedTime === null) {
        that.activeActions.push(action)
      } else {
        that.actionHistory.push(action)
      }
    })

    this.actionCount = this.activeActions.length;
    // console.log('actioncount', this.actionCount)
    this.actionHistoryCount = this.actionHistory.length;
  }

  @action changeJobModalUrl(url) {
    this.jobModalUrl = url;
  }

  // param methods
  @action updateUserParams(params){
    this.userParams = params;
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