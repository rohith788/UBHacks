import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  ref = firebase.database().ref('infos/');
infoForm: FormGroup;
  availableForm: FormGroup;
  name = 'Available'
  start_time = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  end_time = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  constructor(private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { 

      this.infoForm = this.formBuilder.group({
        'info_title' : [null, Validators.required],
        'info_description' : [null, Validators.required]
      });

      this.availableForm = this.formBuilder.group({
        'volName' : [null, Validators.required],
        'start_time' : [null, Validators.required],
        'end_time' : [null, Validators.required]
      });

    }

  ngOnInit() {
  }
  saveInfo() {
    let newInfo = firebase.database().ref('infos/').push();
    newInfo.set(this.infoForm.value);
    this.router.navigate(['/detail/'+newInfo.key]);
  }

  saveDuration() {
    var start_t = this.availableForm.value.start_time
    var end_t = this.availableForm.value.end_time
    console.log(start_t-end_t)
    // console.log(start_t,this.availableForm.value.start_time)
  }

}
