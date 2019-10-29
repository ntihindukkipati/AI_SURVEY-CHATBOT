import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Lets initiate Record OBJ
  private record;
  //Will use this flag for detect recording
  private recording = false;
  //Url of Blob
  private url;
  private error;
  title = 'Chat';
  model: any;
  q=[];
  i=0;
  j=0;
  p:any;
  todos: string[] = [];
  todo: string;
  todop: string;
  inp: string;
  inps: string[]=[];



  constructor( public http: HttpClient,private domSanitizer: DomSanitizer) {
    this.http.get('Question.json').toPromise().then(data => {
      for (let e in data)
        this.q.push(data[e]);
    });

  }
  sanitize(url:string)
  {
    return this.domSanitizer.bypassSecurityTrustUrl(url);

  }
  ngOnInit()
  {
    this.model=
      [{question:'What would the teacher start doing improve the course?'},
        {question:'what would the teacher stop doing to improve the course?'},
        {question:'What is working with the course and continue the same'},
        {question:'What is the overall experience with the course'},
        {question:'Do you have any other comments'},
        {question:'thank you for your time'},

      ]
  }

  Click(){
    this.inps.push("USER: "+this.todo);
   this.inp=this.model[this.i].question;
   this.i=this.i+1;
   this.inps.push("BOT: "+this.inp);
this.todo="";
this.inp="";

  }
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));

  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.todo="audio file";
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
