import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { getCurrentProjectID } from 'src/app/helpers/localStorage';
import { roles } from 'src/app/models/enums/roleEnum';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-edit-contributor',
  templateUrl: './edit-contributor.component.html',
  styleUrls: ['./edit-contributor.component.scss'],
})
export class EditContributorComponent implements OnInit {
  isLoading = false;
  contr: contributorsDTO[] = [];
  editing: Boolean = false;
  rolesEnum: roles;
  roles: any[] = [
    'Projekt owner',
    'Scrum master',
    'Fejlesztő',
    'Teszter',
    'Support',
    'Egyéb',
  ];

  //invite
  myControl = new FormControl();
  emailOptions: string[] = ['lokospatrik8@gmail.com'];
  filteredOptions: Observable<string[]>;
  toEmail: string = `https://formsubmit.co/${this.myControl.value}`;
  //
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let id = getCurrentProjectID();
    this.userService.getAllEmails(id).subscribe((res: string[]) => {
      this.emailOptions = res;
    });
    this.userService.getAllContributors(id).subscribe(
      (resoult: any) => {
        this.contr = resoult;
      },
      (error: HttpErrorResponse) => {}
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emailOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onSubmit() {
    this.isLoading = true;
    this.userService.saveContributors(this.contr).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }
}
