import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../users-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  p: number = 1;
  allUsers: any = [];

  per_pages: number = 0;
  currentPage: number = 0;
  total: number = 0;
  routerLink: any;
  constructor(
    private _UsersDataService: UsersDataService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    if (localStorage.getItem('users')) {
      this.spinner.hide();
      const allData = JSON.parse(localStorage.getItem('users') || '[]');
      this.allUsers = allData.data;
    } else {
      this._UsersDataService.fetchUsers().subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.allUsers = res.data;
        this.per_pages = res.per_page;
        this.currentPage = res.page;
        this.total = res.total;
      });
    }
  }

  pageChanged(event: any): void {
    this.spinner.show();
    this._UsersDataService.fetchUsers(event).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.allUsers = res.data;
      this.per_pages = res.per_page;
      this.currentPage = res.page;
      this.total = res.total;
    });
  }
}
