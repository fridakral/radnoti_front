import { Component, OnInit } from '@angular/core';
import {
  SidenavService,
  SideNavState,
} from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public _opened: boolean = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.sideNavState.subscribe((state: SideNavState) => {
      this._opened = state._opened;
    });
  }
}
