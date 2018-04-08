import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AccountService} from '../../../../shared/services/medical-specialist/account.service';
import {GlobalService} from '../../../../shared/services/global.service';
import {ThemeService} from '../../../../shared/services/theme.service';
import {MedicalSpecialistModel, SpecialisationModel} from '../../../../shared/models/medical-specialist.model';
import {MedicalSpecialistService} from '../../../../shared/services/medical-specialist/medical-specialist.service';
import {SpecialisationsService} from '../../../../shared/services/medical-specialist/specialisations.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileSettingsComponent implements OnInit {
  public hasBaseDropZoneOver: boolean = false;
  constructor(private accountService: AccountService,private globalService: GlobalService,
              private themeService: ThemeService, private renderer: Renderer2,
              private medicalSpecialistService: MedicalSpecialistService,
              private specialisationsService: SpecialisationsService) { }
    console = console;
    passwordForm: FormGroup;
    egretThemes: any[] = [];
    basicForm: FormGroup;
    user: MedicalSpecialistModel = new MedicalSpecialistModel();
    allSpecialisations: SpecialisationModel[] = [];
    userSpecialisations: SpecialisationModel[] = [];
    combinedSpecilastions: SpecialisationModel[] = [];
    specialisationsList: any = [];
    notifications: boolean = false;
    selectedTheme: string;
    activeTheme: string;
    ngOnInit() {
        this.getUser();
        if(this.getActiveSettings() !== false){
            let settings = this.getActiveSettings();
            this.notifications = settings.notifications;
            this.activeTheme = settings.theme;
        }
        this.egretThemes = this.themeService.egretThemes;
        console.log(this.themeService.activatedTheme);
        let password = new FormControl('', Validators.required);
        let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
        this.basicForm = new FormGroup({
            username: new FormControl('', [
            ]),
            firstName: new FormControl('', [
                Validators.required
            ]),
            lastName: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            organisation: new FormControl('', []),
            telephon: new FormControl('', CustomValidators.phone('BD')),
            otherContact: new FormControl('', []),
            location: new FormControl('', []),
            description: new FormControl('', []),
        });

        this.passwordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword
        })

    }

    getUser(){
        Promise.resolve(this.medicalSpecialistService.fetchUser())
            .then(response => {
                let res: any = response;
                this.user = res.message;
                this.userSpecialisations = this.user.specialisations;
                for(let spec of this.userSpecialisations){
                    this.specialisationsList.push(spec.id);
                }
                this.basicForm.patchValue({
                    username: this.user.username,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    telephon: this.user.telephon,
                    otherContact: this.user.otherContact,
                    organisation: this.user.organisation,
                    location: this.user.location,
                    description: this.user.description,
                    // formControlName2: myValue2 (can be omitted)
                });
                Promise.resolve(this.specialisationsService.fetchAllSpecialisations().then(res =>{
                    this.allSpecialisations = res.message;
                    for(let item of this.userSpecialisations){
                        for (let _item of this.allSpecialisations){
                            if(item.id == _item.id){
                                _item.active = true;
                            }
                        }
                    }
                    console.log(this.allSpecialisations);
                    console.log(this.userSpecialisations);
                }).catch(err =>{
                    console.log(err);
                }))
            }).catch(err => {
            console.log(err);
        })
    }
    updateUser(){
        let tempData = this.basicForm.getRawValue();
        let data = {
            firstName: tempData.firstName,
            lastName: tempData.lastName,
            username: tempData.username,
            email: tempData.email,
            telephone: tempData.telephon,
            otherContact: tempData.otherContact,
            organisation: tempData.organisation,
            location: tempData.location,
            description: tempData.description,
        };
        console.log(data);
        Promise.resolve(this.medicalSpecialistService.updateUser(data))
            .then(response => {
                let res: any = response;
                console.log(res);
                this.globalService.showNotice(res.message);
            }).catch(err => {
            console.log(err);
        })
    }
    selectSpec(e){
        let id = e.source.value;
        this.addOrRemove(this.specialisationsList, parseInt(id));
        console.log(this.specialisationsList);
    }
    addOrRemove(array, value) {
        var index = array.indexOf(value);

        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }
    updateSpecialisations(){
        let data = this.specialisationsList;
        Promise.resolve(this.specialisationsService.updateSpecialisations(data))
            .then(response => {
                let res: any = response;
                console.log(res);
                this.globalService.showNotice(res.message);
            }).catch(err => {
            console.log(err);
        })
    }

    changePassword(){
        console.log(this.passwordForm);
      let data = {
          password: this.passwordForm.value.password,
          repeatedPassword: this.passwordForm.value.password
      };
      Promise.resolve(this.accountService.changePassword(data).then(res =>{
          this.globalService.showNotice(res.message);
      }).catch(err =>{
          console.log(err);
      }))
    }
    getActiveSettings(){
        let appSettings = JSON.parse(localStorage.getItem("appSettings"));
        if(!isNullOrUndefined(appSettings)){
            return appSettings;
        }
        else return false;
    }
    changeTheme(theme) {
        this.selectedTheme = theme
        console.log(this.selectedTheme)
    }
    saveTheme(){
        let data;
        if(isNullOrUndefined(this.selectedTheme) && isNullOrUndefined(this.activeTheme)){
            data = {
                notifications: this.notifications,
                theme: 3
            };
        }
        else if (isNullOrUndefined(this.selectedTheme)) {
            data = {
                notifications: this.notifications,
                theme: this.activeTheme
            };
        }
        else {
            data = {
                notifications: this.notifications,
                theme: this.selectedTheme
            };
        }
        localStorage.setItem("appSettings",JSON.stringify(data));
        window.location.reload();
    }

}
