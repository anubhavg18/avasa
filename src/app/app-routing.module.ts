import { HomeSherpaPopUpComponent } from './components/frontend/home-sherpa-pop-up/home-sherpa-pop-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
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
import { AccommodationNearLbsComponent} from './components/frontend/accommodation-near-lbs/accommodation-near-lbs.component';
import { ProptechStartupComponent } from './components/frontend/proptech-startup/proptech-startup.component';
import { PrivacyPolicyComponent } from './components/frontend/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/frontend/terms-of-use/terms-of-use.component';
import { SherpaBusyProfessionalsComponent } from './components/frontend/sherpa-busy-professionals/sherpa-busy-professionals.component';
import { SherpaBusyCorporatesComponent } from './components/frontend/sherpa-busy-corporates/sherpa-busy-corporates.component';
import { SherpaBusyStudentsComponent } from './components/frontend/sherpa-busy-students/sherpa-busy-students.component';
import { RequestResetComponent } from './components/auth/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/auth/password/response-reset/response-reset.component';
import { DhakaUserComponent } from './components/users/dhaka-user/dhaka-user.component';
import { ApproveTeamUserComponent } from './components/users/approve-team-user/approve-team-user.component';
import { DialogFlowUsersComponent } from './components/users/dialog-flow-users/dialog-flow-users.component';
import { AfterLoginService} from 'src/app/services/login/after-login.service';
import { BeforeLoginService} from 'src/app/services/login/before-login.service';
import { SuperAdminComponent } from './components/users/super-admin/super-admin.component';
import { ChatComponent } from './components/chat/chat.component';
import { NormalUserComponent } from './components/users/normal-user/normal-user.component';
import { LayoutsComponent } from './components/users/super-admin/layouts/layouts.component';
import { DhakaUserLayoutsComponent } from './components/users/dhaka-user/dhaka-user-layouts/dhaka-user-layouts.component';
import { ApproveTeamUserLayoutsComponent } from './components/users/approve-team-user/approve-team-user-layouts/approve-team-user-layouts.component';

// user profile
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { PrivatePolicyComponent } from './components/private-policy/private-policy.component';
import { SherpaRecoComponent } from './components/sherpa-reco/sherpa-reco.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookacuityComponent } from './components/bookacuity/bookacuity.component';
import { from } from 'rxjs';
import { DialogUserLayoutsComponent } from './components/users/dialog-flow-users/dialog-user-layouts/dialog-user-layouts.component';
import { SearchCriteriaComponent } from './components/frontend/search-criteria/search-criteria.component';
import { MobileAppComponent } from './components/frontend/mobile-app/mobile-app.component';
import { PropertyNearImperialComponent } from './components/frontend/property-near-imperial/property-near-imperial.component';
import { MyShortlistComponent } from './components/frontend/my-shortlist/my-shortlist.component';
import { PropertyDetailsComponent } from './components/frontend/property-details/property-details.component';
import { MyShortlistPropertyDetailsComponent } from './components/frontend/my-shortlist-property-details/my-shortlist-property-details.component';
import { PreferredAreaComponent } from './components/preferred-area/preferred-area.component';
import { PropertyListingComponent } from './components/frontend/property-listing/property-listing.component';

import { AskQuestionComponent } from './components/frontend/ask-question/ask-question.component';
import { AskQuestionFormComponent } from './components/frontend/ask-question-form/ask-question-form.component';



const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  { path: 'register', component: RegisterComponent, pathMatch: 'full',canActivate: [BeforeLoginService]},
  { path: 'forget-password', component: RequestResetComponent, pathMatch: 'full',canActivate: [BeforeLoginService]},

  // { path: 'chat', component: ChatComponent, canActivate: [AfterLoginService],data: {role: 3}},
  { path: 'super-admin/user', component: LayoutsComponent,canActivate: [AfterLoginService],data: {role: 4}, children: [                          //<---- child components declared here
    {
        path:'',
        component: SuperAdminComponent
    },
  ]},

  { path: 'dialog-flow/user', component: DialogUserLayoutsComponent,canActivate: [AfterLoginService],data: {role: 3}, children: [                          //<---- child components declared here
    {
        path:'chat',
        component: ChatComponent
    },
  ]},
  // dashboards for users
  { path: 'user', component: NormalUserComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'dhaka/user', component: DhakaUserLayoutsComponent,canActivate: [AfterLoginService],data: {role: 1},children: [                          //<---- child components declared here
    {
        path:'',
        component: DhakaUserComponent
    },]},
    { path: 'approve-team/user', component: ApproveTeamUserLayoutsComponent,canActivate: [AfterLoginService],data: {role: 2},children: [                          //<---- child components declared here
      {
          path:'',
          component: ApproveTeamUserComponent
      },]},
  { path: 'dialog-flow/user', component: DialogFlowUsersComponent, pathMatch: 'full',canActivate: [AfterLoginService],data: {role: 3}},
//   { path: 'super-admin/user', component: SuperAdminComponent, pathMatch: 'full',
//    canActivate: [AfterLoginService],data: {role: 4}
// },


// user profile
  { path: 'useracount', component: UserAccountComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'mycalender', component: MyCalendarComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'sherpareco', component: SherpaRecoComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'myprofile', component: ProfileComponent,canActivate: [AfterLoginService],data: {role: 0}},



  { path: 'home-search', component: SearchComponent, pathMatch: 'full'},
  { path: 'search-criteria', component: SearchCriteriaComponent, pathMatch: 'full'},
  { path: 'sherpa-services', component: SherpaServicesComponent, pathMatch: 'full'},
  { path: 'area-guides', component: AreaGuidesComponent, pathMatch: 'full'},
  { path: 'sherpa-tips', component: SherpaTipsComponent, pathMatch: 'full'},
  { path: 'how-it-works', component: HowItWorksComponent, pathMatch: 'full'},
  { path: 'our-story', component: OurStoryComponent, pathMatch: 'full'},
  { path: 'site-map', component: SiteMapComponent, pathMatch: 'full'},
  { path: 'privacy-policy', component: PrivacyPolicyComponent, pathMatch: 'full'},
  { path: 'terms-of-use', component: TermsOfUseComponent, pathMatch: 'full'},
  { path: 'sherpa-busy-professionals', component: SherpaBusyProfessionalsComponent, pathMatch: 'full'},
  { path: 'sherpa-busy-corporates', component: SherpaBusyCorporatesComponent, pathMatch: 'full'},
  { path: 'sherpa-busy-students', component: SherpaBusyStudentsComponent, pathMatch: 'full'},
  { path: 'proptech-startup', component: ProptechStartupComponent, pathMatch: 'full'},
  { path: 'accommodation-near-lbs', component: AccommodationNearLbsComponent, pathMatch: 'full'},
  { path: 'home-sherpa-pop-up', component: HomeSherpaPopUpComponent, pathMatch: 'full'},
  { path: 'mobile-app', component: MobileAppComponent, pathMatch: 'full'},
  { path: 'my-shortlist', component: MyShortlistComponent,canActivate: [AfterLoginService],data: {role: 0}},
  
  { path: 'property-details/:listing_id', component: PropertyDetailsComponent, pathMatch: 'full'},
  { path: 'my-shortlist/:propertyId', component: MyShortlistPropertyDetailsComponent, pathMatch: 'full'},
  
  { path: 'imperial-college', component: PropertyNearImperialComponent, pathMatch: 'full'},
  { path: 'preferred-area', component: PreferredAreaComponent, pathMatch: 'full'},
  { path: 'property-listing', component: PropertyListingComponent, pathMatch: 'full'},
  { path: 'ask-question', component: AskQuestionComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'ask-question-form', component: AskQuestionFormComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: 'bookacuity', component: BookacuityComponent,canActivate: [AfterLoginService],data: {role: 0}},
  { path: '**', redirectTo: '' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
