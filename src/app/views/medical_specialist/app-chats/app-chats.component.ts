import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { MatSidenav, MatDialog } from '@angular/material';
import {ConsultationRequestsService} from '../../../shared/services/medical-specialist/consultation-requests.service';
import {CrMessageModel} from '../../../shared/models/cr-message.model';
import {GlobalService} from '../../../shared/services/global.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './app-chats.component.html',
  styleUrls: ['./app-chats.component.css']
})
export class AppChatsComponent implements OnInit {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  @ViewChild(MatSidenav) private sideNave: MatSidenav;

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
    lastMsg: 'What\'s going!'
  }]
    crMessageList: CrMessageModel[] = [];
    crId: any;
    comment: any;
    constructor(private media: ObservableMedia,
                private consultationRequestsService: ConsultationRequestsService,
                private globalService: GlobalService, private router: Router) {
      if(isNullOrUndefined(this.globalService.crId) || this.globalService.crId == ''){
        this.router.navigate(['/ms/consultation-requests']);
      }
    }

  ngOnInit() {
      console.log(this.globalService.crId);
      console.log(this.globalService.crMessageList);
      this.crMessageList = this.globalService.crMessageList;
      this.crId = this.globalService.crId;
      this.chatSideBarInit();
  }
  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
  }

  sendMessage(){
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
