import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../users-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store, select } from '@ngrx/store';
import { getAllUsers, invokeUserAPI } from '../users-store/users.actions';
import { User } from '../users-store/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  p: number = 1;
  allUsers: any = [];
  //store
  allusers!: Observable<User[]>;

  per_pages: number = 0;
  currentPage: number = 0;
  total: number = 0;

  constructor(
    private _UsersDataService: UsersDataService,
    private spinner: NgxSpinnerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    if (localStorage.getItem('users')) {
      this.spinner.hide();
      const allData = JSON.parse(localStorage.getItem('users') || '[]');
      this.allUsers = allData.data;
    } else {
      this._UsersDataService.fetchUsers().subscribe((result) => {
        console.log(result);
        this.spinner.hide();
        this.handle_pagination(result);
      });
    }
  }

  pageChanged(event: any): void {
    this.spinner.show();
    this._UsersDataService.fetchUsers(event).subscribe((result) => {
      console.log(result);
      this.spinner.hide();
      this.handle_pagination(result);
    });
  }

  handle_pagination(result: any): void {
    this.allUsers = result.data;
    this.per_pages = result.per_page;
    this.currentPage = result.page;
    this.total = result.total;
  }
}
