import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HeaderServiceService } from 'src/app/services/header-service/header-service.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ThemeService } from 'src/app/services/theme-service/theme-service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AddUserToProjectDialogComponent } from '../dialogs/add-user-to-project-dialog/add-user-to-project-dialog/add-user-to-project-dialog.component';
import { EditContributorComponent } from '../dialogs/edit-contributors-dialog/edit-contributor/edit-contributor.component';
import { UserUpdateDialogComponent } from '../dialogs/user-update-dialog/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  IsLogin: boolean = true;
  isDarkMode: boolean;
  BtnTxt: string;
  isLoggedIn: Boolean = false;
  isLoggedInSrc: Subject<boolean>;
  loggedInUser: string;
  loggedInUserSrc: Subject<string>;
  onMainPage: Boolean = false;
  onMainPageSrc: Subject<boolean>;
  //= JSON.parse(localStorage.getItem('loggedInUser')!);

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private sidenavService: SidenavService,
    private header: HeaderServiceService,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.router.navigate(['login']);
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.isLoggedInSrc = this.header.isLoggedInSource;
    this.isLoggedInSrc.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.loggedInUserSrc = this.header.isLoggedInUserSource;
    this.loggedInUserSrc.subscribe((value) => {
      this.loggedInUser = value;
    });
    this.onMainPageSrc = this.header.onMainPageSource;
    this.onMainPageSrc.subscribe((value) => {
      this.onMainPage = value;
    });

    this.userService.updateHeader$.subscribe((res) => {
      this.loggedInUser = res;
    });
  }

  ngOnInit(): void {}

  moveToProject() {
    this.onMainPage = false;
    this.router.navigate(['projects']);
  }

  move() {
    this.IsLogin = !this.IsLogin;
    this.IsLogin
      ? this.router.navigate(['login'])
      : this.router.navigate(['register']);
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  toggleSidenav() {
    let i = 0;
    if (i === 1) {
      this.sidenavService._hide();
      i = 0;
    } else {
      this.sidenavService._show();
      i = 1;
    }
  }

  logout() {
    this.isLoggedIn = false;
    sessionStorage.clear();
    localStorage.clear();
    this.loggedInUser = '';
  }

  openAddUserToProjectDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    const dialogRef = this.dialog.open(
      AddUserToProjectDialogComponent,
      dialogConfig
    );
  }

  openEditContributorsDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    const dialogRef = this.dialog.open(EditContributorComponent, dialogConfig);
  }

  openProfileDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['userUpdate-dialog'];
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    dialogConfig.data = {
      name: this.loggedInUser,
    };
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, dialogConfig);
  }
}
