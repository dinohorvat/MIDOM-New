import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import {ConsultationRequestsService} from '../../services/medical-specialist/consultation-requests.service';
import {ConsultationRequestModel} from '../../models/consultation-request.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;
  icon: 'assignment_ind';

  // Dummy notifications
  notifications = [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Server rebooted',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }]
  consultationRequestList: ConsultationRequestModel[] = [];

  constructor(private router: Router,
              private consultationRequestService: ConsultationRequestsService) {}

  ngOnInit() {
    this.getConsultationRequest("Pending");
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }
    getConsultationRequest(status) {
        this.consultationRequestList = [];
        Promise.resolve(this.consultationRequestService
            .fetchConsultationRequest(status).then(res => {
                this.consultationRequestList = res.message;
                this.consultationRequestList.reverse();
            }).catch(err => {
                console.log(err);
            }))
    }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }


}
