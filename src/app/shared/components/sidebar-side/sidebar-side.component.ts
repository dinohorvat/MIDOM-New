import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from '../../services/theme.service';
import { Subscription } from "rxjs/Subscription";
import PerfectScrollbar from 'perfect-scrollbar';
import {MedicalSpecialistService} from '../../services/medical-specialist/medical-specialist.service';
import {MedicalSpecialistModel} from '../../models/medical-specialist.model';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  user: MedicalSpecialistModel = new MedicalSpecialistModel();
  isAvailable: boolean = false;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    public medicalSpecialistService: MedicalSpecialistService
  ) { }

  ngOnInit() {
    this.getUser();
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      })
    })
  }
  ngOnDestroy() {
    if(this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if(this.menuItemsSub) {
      this.menuItemsSub.unsubscribe()
    }
  }
  changeStatus(state){
      let currStatus;
      if(state.checked){
          currStatus = 'available';
      }
      else{
          currStatus = 'not available';
      }
      let data = {
          status: currStatus
      };
      console.log(data);
      Promise.resolve(this.medicalSpecialistService.changeStatus(data))
          .then(response => {

          }).catch(err => {
          console.log(err);
      })
  }
    getUser(){
        Promise.resolve(this.medicalSpecialistService.fetchUser())
            .then(response => {
                let res: any = response;
                this.user = res.message;
                this.isAvailable = this.user.isAvailable;
            }).catch(err => {
            console.log(err);
        })

    }



}
