import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'Firebase';
import { ApiService } from '../api.service';
import { snapshotToArray } from '../volunteer/volunteer.page';
declare var webkitSpeechRecognition: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  regex = '/([1][2]:[0][0]\s[P][M]|[1][1]:[0][0]\s[A][M]|[1][0]:[0][0]\s[P,A][M]|[^1-9][1-9]:[0][0]\s[P,A][M])/g';
  regexp:any;
  smsData = {
    From: '+12013409093',
    To: '+17162758423',
    Body: 'Test'
  }

  isRecording = false;
  isWebSpeechRecording = false;
  matches: string[] = [];
  response = 'Press red button and start speaking';
  recording = {
    name: 'John',
    text: '',
    mob: '716-275-7345'
  }
  ref = firebase.database().ref('timings/');
  time_array = []

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingCtrl: LoadingController,
    private apiService: ApiService
    ) {
      this.ref.on('value', resp => {
        var data = snapshotToArray(resp);
      this.time_array = data[0];
    })
    }

    async movieSearch(searchTerms: string[]) {
      if (searchTerms && searchTerms.length > 0) {
  
        const loading = await this.loadingCtrl.create({
          message: 'Please wait...'
      });
        loading.present();
  
        this.matches = searchTerms;
       

        console.log(this.matches[0])
        this.saveInfo()
        // push to databast
        loading.dismiss();
        this.changeDetectorRef.detectChanges();

    }}

  searchWebSpeech() {
    if (!('webkitSpeechRecognition' in window)) {
      return;
  }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;

    recognition.onstart = () => {
      this.isWebSpeechRecording = true;
      this.changeDetectorRef.detectChanges();
    };

    recognition.onerror = event => console.log('error', event);
    recognition.onend = () => {
      this.isWebSpeechRecording = false;
      this.changeDetectorRef.detectChanges();
    };

    recognition.onresult = event => {
      const terms = [];
      if (event.results) {
        for (const result of event.results) {
          for (const ra of result) {
            terms.push(ra.transcript);
          }
        }
  }

      this.movieSearch(terms);
    };

    recognition.start();
  }
  saveInfo() {
    var avail = true;
    this.recording.text = this.matches[0];
    var mat = this.matches[0].match(/(\d+)/);
    var ma = parseInt(mat[0]);
    if (!this.time_array[(ma+3)%12].status) {
      avail = false;
      this.response = "All volunteers are busy at the given time. Sorry"
    } 
    if(avail) {
      var newInfo = firebase.database().ref('recordings/').push();

    }
    // console.log(this.time_array[ma+3])
    newInfo.set(this.recording).then((value) => {
      this.response =  "We have sent your request to one of the volunteers.";
      speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));
      // this.matches[0] = this.response;
      // console.log(this.time_array)
      this.sendMsg()
    })
    
    // this.router.navigate(['/detail/'+newInfo.key]);
  }
  sendMsg() {
    this.smsData.Body = this.matches[0];
    this.apiService.sendNotification(this.smsData)
    // .subscribe((data) => {
    //   console.log(data)
    // })
  }



}
