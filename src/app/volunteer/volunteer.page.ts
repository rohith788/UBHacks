import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.page.html',
  styleUrls: ['./volunteer.page.scss'],
})
export class VolunteerPage implements OnInit {
  time_array = [ 
    {time: '09:00', status: true}, 
  {time: '10:00', status: true}, 
  {time: '11:00', status: true}, 
  {time: '12:00', status: true}, 
  {time: '13:00', status: true}, 
  {time: '14:00', status: true}, 
  {time: '15:00', status: true}, 
  {time: '16:00', status: true}, 
  {time: '17:00', status: true}, 
  {time: '18:00', status: true}, 
  {time: '19:00', status: true}, 
  {time: '20:00', status: false}];
  status_array = []
  infos = [];
  ref1 = firebase.database().ref('infos/');
  ref = firebase.database().ref('timings/');

  constructor(public alertController: AlertController,public router: Router, public loadingController: LoadingController) {
    this.ref1.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
    this.ref.on('value', resp => {
      var data = snapshotToArray(resp);
    this.time_array = data[0];
    console.log(data);
    })
   }
   
   addInfo() {
    this.router.navigate(['/add-info']);
  }
  changeStatus(i) {
    if( this.time_array[i].status) {
      this.time_array[i].status = !this.time_array[i].status
    }
    console.log(this.time_array[i]);
  }

  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }

  async delete(key) {
    
      firebase.database().ref('timings/'+key).remove();
         
  }

  ngOnInit() {
  }
  saveInfo() {
    firebase.database().ref('timings/').remove();
    let newInfo = firebase.database().ref('timings/').push();
    newInfo.set(this.time_array);
    // this.router.navigate(['/timings/'+newInfo.key]);
  }

  

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
