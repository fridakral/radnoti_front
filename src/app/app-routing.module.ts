import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'navigation',
    component: NavigationComponent,
  },
  {
    path: 'projects',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
