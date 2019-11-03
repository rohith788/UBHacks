import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { snapshotToArray } from '../volunteer/volunteer.page';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  recordings = [];

  ref = firebase.database().ref('recordings/');

  constructor() {
    this.ref.on('value', resp => {
      this.recordings = [];
      this.recordings = snapshotToArray(resp);
      // console.log(this.recordings)
    });
   }
   async delete(key) {
     console.log(key);
    
    firebase.database().ref('recordings/'+key).remove();
       
}

  ngOnInit() {
  }

}
