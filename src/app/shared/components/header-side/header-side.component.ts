import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {GlobalService} from '../../services/global.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'en';
  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Croatian',
    code: 'hr',
  }];
  public egretThemes;
  public layoutConf:any;
  public notifications: boolean = false;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public globalService: GlobalService
  ) {}
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.globalService.getConsultationRequest("Pending");
    if(this.getNotifications() !== false){
        this.notifications = this.getNotifications();
    }
  }
    getNotifications(){
        let appSettings = JSON.parse(localStorage.getItem("appSettings"));
        if(!isNullOrUndefined(appSettings.notifications)){
            return appSettings.notifications;
        }
        else return false;
    }
  setLang() {
    this.translate.use(this.currentLang)
  }
  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true})

  }
}