import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { MatSidenav, MatDialog } from '@angular/material';
import {ConsultationRequestsService} from '../../../shared/services/medical-specialist/consultation-requests.service';
import {CrMessageModel} from '../../../shared/models/cr-message.model';
import {GlobalService} from '../../../shared/services/global.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-chats',
  templateUrl: './app-chats.component.html',
  styleUrls: ['./app-chats.component.css']
})
export class AppChatsComponent implements OnInit {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  audioShow: boolean = true;
  audioFile: any;
  @ViewChild(MatSidenav) private sideNave: MatSidenav;
    @ViewChild('audioOption') audioPlayerRef: ElementRef;

  activeChatUser = {
    name: 'Test test',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: 'Hello!'
  };

  connectedUsers = [{
    name: 'Test test',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: ''
  }];
    crMessageList: CrMessageModel[] = [];
    crId: any;
    comment: any;
    disabled: boolean = false;
    constructor(private media: ObservableMedia,
                private consultationRequestsService: ConsultationRequestsService,
                private globalService: GlobalService, private router: Router,
                private loader: AppLoaderService
    ) {
      if(isNullOrUndefined(this.globalService.crId) || this.globalService.crId == ''){
        this.router.navigate(['/ms/consultation-requests']);
      }
    }

  ngOnInit() {
      console.log(this.globalService.crId);
      console.log(this.globalService.crMessageList);
      this.crMessageList = this.globalService.crMessageList;
      console.log(this.crMessageList);
      this.crId = this.globalService.crId;
      if(this.globalService.crStatus == 'Closed' || this.globalService.crStatus == 'Rejected'
      || this.globalService.crStatus == 'Revoked'){
          this.disabled = true;
      }
      this.chatSideBarInit();
  }
  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
  }

  sendMessage(){
      if(this.comment !== 'AudioFile'){
      let message: CrMessageModel = new CrMessageModel();
      message.msSender = "1";
      message.comment = this.comment;
      var date = new Date();
      var time = date.getTime();
      message.creationTime = time;
      let data = {
          comment: this.comment,
          crId: this.crId.toString(),
      };
      Promise.resolve(this.consultationRequestsService.newCrMessage(data)
          .then(res => {
              console.log(res);
              this.crMessageList.push(message);
              // Scroll to message
              document.getElementById("conversation-holds").scrollTop = document.getElementById("conversation-holds").scrollHeight;

              this.comment = '';
          }).catch(err =>{
                  console.log(err);
              }
          ));
      }
      else{
          let message: CrMessageModel = new CrMessageModel();
          message.msSender = "1";
          message.comment = this.audioFile.name;
          var date = new Date();
          var time = date.getTime();
          message.creationTime = time;

          this.loader.open("Sending Audio Message...");
          console.log(this.audioFile);
          let formData = new FormData();
          formData.append("audioFile", this.audioFile);
          console.log(formData);
          Promise.resolve(this.consultationRequestsService.uploadAudioFile(formData, this.crId.toString(),this.audioFile.name)
              .then(res => {
                  console.log(res);
                  this.crMessageList.push(message);
                  this.comment = '';
                  this.loader.close();
              }).catch(err =>{
                      console.log(err);
                  }
              ));

      }

  }

  uploadFile(){
        console.log('upload');
        let element: HTMLElement = document.getElementById("audioFile") as HTMLElement;
        element.click();
  }
  uploadAudio(e){
        console.log(e);
      this.audioShow = false;
      let audio = this.audioPlayerRef.nativeElement;
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      let reader = new FileReader();
      this.audioFile = file;
      reader.onload = function (event:any) {
          console.log(event);
          audio.src = event.target.result;
          audio.load();
          audio.play();
      };
      this.comment = "AudioFile";
      reader.readAsDataURL(file);
  }

  changeActiveUser(user) {
    this.activeChatUser = user;
  }
  updateSidenav() {
    var self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      self.sideNave.mode = self.isMobile ? 'over' : 'side';
    })
  }
  chatSideBarInit() {
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.updateSidenav();
    this.screenSizeWatcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
      this.updateSidenav();
    });
  }
}
