import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  //SID = 'AC984d60a620f81736d9f02f1aa9787ec5'
  //Key = 'b875698835d92bff5ca8ddde4367572f'
  SID: string = ''
  Key: string = ''
  apiUrl: string = ''//'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json'
  
  
  
  constructor(private http: HttpClient) {
    this.SID = 'AC984d60a620f81736d9f02f1aa9787ec5'
    this.Key = 'b875698835d92bff5ca8ddde4367572f'
    
    this.apiUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + this.SID + '/Messages.json'
    
  }
  
  sendNotification(data) {
    let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Basic ' + btoa(this.SID + ':' + this.Key));
    // console.log(headers, data);
    // return this.http.post(this.apiUrl, data, {headers})
        
   }
}
