import {observable, action} from 'mobx'
import data from './fakeData'


class ObservableStore {
  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  //actions
  @observable actions = [];
  @observable activeActions = [];
  @observable actionHistory = [];
  @observable actionCount = 0;
  @observable actionHistoryCount = 0;
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

  @action changeJobScreenTab(tabName) {
    this.jobScreenActiveTab = tabName;
    console.log('jobs: ', this.jobs)
  }

  // general
  @action push(entry, array){
    if (array === 'actionHistory') {
      this.actionHistory.push(entry);
    }
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
      if (n === '-') {
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
      if (n === '-') {
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
    res.forEach(function(action) {
      if (action.completedTime === null) {
        that.activeActions.push(action)
      } else {
        that.actionHistory.push(action)
      }
    })

    this.actionHistory = this.actionHistory.sort((a, b) => a.scheduledTime < b.scheduledTime? 1 : 0)
    console.log('sorted', this.actionHistory)
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

}

const observableStore = new ObservableStore();
export default observableStore;