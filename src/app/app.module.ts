import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { environment } from './../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { RegisterComponent } from './components/auth/register/register.component';

import { FooterComponent } from './components/frontend/layouts/footer/footer.component';
import { HeaderComponent } from './components/frontend/layouts/header/header.component';
import { HomePageComponent } from './components/frontend/home-page/home-page.component';
import { SearchComponent } from './components/frontend/search/search.component';
import { SherpaServicesComponent } from './components/frontend/sherpa-services/sherpa-services.component';
import { AreaGuidesComponent } from './components/frontend/area-guides/area-guides.component';
import { SherpaTipsComponent } from './components/frontend/sherpa-tips/sherpa-tips.component';
import { HowItWorksComponent } from './components/frontend/how-it-works/how-it-works.component';
import { OurStoryComponent } from './components/frontend/our-story/our-story.component';
import { SiteMapComponent } from './components/frontend/site-map/site-map.component';
import { PrivacyPolicyComponent } from './components/frontend/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/frontend/terms-of-use/terms-of-use.component';
import { SherpaBusyProfessionalsComponent } from './components/frontend/sherpa-busy-professionals/sherpa-busy-professionals.component';
import { SherpaBusyCorporatesComponent } from './components/frontend/sherpa-busy-corporates/sherpa-busy-corporates.component';
import { SherpaBusyStudentsComponent } from './components/frontend/sherpa-busy-students/sherpa-busy-students.component';
import { RequestResetComponent } from './components/auth/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/auth/password/response-reset/response-reset.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NotifierModule } from 'angular-notifier';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './services/chat/chat.service';


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,

} from "angular-6-social-login-v2";
import { DhakaUserComponent } from './components/users/dhaka-user/dhaka-user.component';
import { ApproveTeamUserComponent } from './components/users/approve-team-user/approve-team-user.component';


import { DialogFlowUsersComponent } from './components/users/dialog-flow-users/dialog-flow-users.component';
import { SuperAdminComponent } from './components/users/super-admin/super-admin.component';
import { NormalUserComponent } from './components/users/normal-user/normal-user.component';
import { AlertComponent } from './components/alert/alert.component';
import { LayoutsComponent } from './components/users/super-admin/layouts/layouts.component';
import { DhakaUserLayoutsComponent } from './components/users/dhaka-user/dhaka-user-layouts/dhaka-user-layouts.component';
import { ProptechStartupComponent } from './components/frontend/proptech-startup/proptech-startup.component';
import { AccommodationNearLbsComponent } from './components/frontend/accommodation-near-lbs/accommodation-near-lbs.component';
import { HomeSherpaPopUpComponent } from './components/frontend/home-sherpa-pop-up/home-sherpa-pop-up.component';
import { DialogUserLayoutsComponent } from './components/users/dialog-flow-users/dialog-user-layouts/dialog-user-layouts.component';
import { SearchCriteriaComponent } from './components/frontend/search-criteria/search-criteria.component';
import { MobileAppComponent } from './components/frontend/mobile-app/mobile-app.component';
import { PropertyNearImperialComponent } from './components/frontend/property-near-imperial/property-near-imperial.component';
import { SearchFieldComponent } from './components/frontend/search-field/search-field.component';
import { ApproveTeamUserLayoutsComponent } from './components/users/approve-team-user/approve-team-user-layouts/approve-team-user-layouts.component';
import { MyShortlistComponent } from './components/frontend/my-shortlist/my-shortlist.component';
import { Header1Component } from './components/frontend/layouts/header1/header1.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { SherpaRecoComponent } from './components/sherpa-reco/sherpa-reco.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { PrivatePolicyComponent } from './components/private-policy/private-policy.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ProfilesidebarComponent } from './components/profilesidebar/profilesidebar.component';
import { PropertyDetailsComponent } from './components/frontend/property-details/property-details.component';
import { Header2Component } from './components/frontend/layouts/header2/header2.component';
import { MyShortlistPropertyDetailsComponent } from './components/frontend/my-shortlist-property-details/my-shortlist-property-details.component';
import { ShareButtonsModule } from 'ngx-sharebuttons';




// Configs for social login
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("455067081690612")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("341024557812-28drten3lnkt43kvnbckj4n73a70tf8i.apps.googleusercontent.com")
        },
        
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    SearchComponent,
    SherpaServicesComponent,
    AreaGuidesComponent,
    SherpaTipsComponent,
    HowItWorksComponent,
    OurStoryComponent,
    SiteMapComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    SherpaBusyProfessionalsComponent,
    SherpaBusyCorporatesComponent,
    SherpaBusyStudentsComponent,
    RequestResetComponent,
    ResponseResetComponent,
    DhakaUserComponent,
    ApproveTeamUserComponent,
    
    
    
    DialogFlowUsersComponent,
    
    
    
    SuperAdminComponent,
    ChatComponent,
    NormalUserComponent,
    
    AlertComponent,
    LayoutsComponent,
    DhakaUserLayoutsComponent,
    ProptechStartupComponent,
    AccommodationNearLbsComponent,
    HomeSherpaPopUpComponent,
    DialogUserLayoutsComponent,
    SearchCriteriaComponent,
    MobileAppComponent,
    PropertyNearImperialComponent,
    SearchFieldComponent,
    ApproveTeamUserLayoutsComponent,
    MyShortlistComponent,
    Header1Component,
    ProfileComponent,
    MyCalendarComponent,
    SherpaRecoComponent,
    TermConditionComponent,
    PrivatePolicyComponent,
    UserAccountComponent,
    ProfilesidebarComponent,
    PropertyDetailsComponent,
    Header2Component,
    MyShortlistPropertyDetailsComponent
  
  
    
    
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6W2Kltq6_tQyKXYZiNORGs_ggg0uL6mU',
      libraries: ["places"]
    }),
    // GooglePlaceModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    NotifierModule,AgmCoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,MatFormFieldModule,MatInputModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    ShareButtonsModule.forRoot()
  ],
  providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
  LoginService,ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
