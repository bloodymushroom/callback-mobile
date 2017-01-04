import {observable, action} from 'mobx'
import data from './fakeData'


class ObservableStore {
  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  @observable actions = [];
  @observable jobs = [];
  @observable jobScreenActiveTab = 'Active';
  @observable jobModalUrl = '';

  @action changeJobScreenTab(tabName) {
    this.jobScreenActiveTab = tabName;
    console.log('jobs: ', this.jobs)
  }

  @action updateJobs(jobs) {
    this.jobs = jobs;
  }

  @action updateActions(actions) {
    this.actions = actions;
  }

  @action reviewJob(outcome) {
    if (outcome === 'saved') {
      // auto generate task
    } else {
      // set job as unfavored
    }

    this.jobs = this.jobs.shift();
  }

  @action changeJobModalUrl(url) {
    this.jobModalUrl = url;
  }

  @action getJobs() {
    var that = this;
    console.log(this.jobs)
    fetch('http://jobz.mooo.com:3000/jobs/1')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response in store', responseJson.Jobs)
        that.jobs = responseJson.Jobs;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const observableStore = new ObservableStore();
export default observableStore;