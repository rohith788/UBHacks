import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'Firebase';
import { ApiService } from '../api.service';
declare var webkitSpeechRecognition: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingCtrl: LoadingController,
    private apiService: ApiService
    ) {}

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
    let newInfo = firebase.database().ref('recordings/').push();
    this.recording.text = this.matches[0];
    newInfo.set(this.recording).then((value) => {
      this.response =  "We have sent your request to one of the volunteers.";
      speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));
      // this.matches[0] = this.response;
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
