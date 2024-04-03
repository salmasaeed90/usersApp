import { Component } from '@angular/core';
import { UsersDataService } from '../users-data.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _UsersDataService: UsersDataService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  userId!: any;
  usersData: any = [];
  findUser() {
    if (localStorage.getItem('users')) {
      this.usersData = JSON.parse(localStorage.getItem('users') || '[]');
      this.usersData.data.map((user: any) => {
        if (user.id === Number(this.userId)) {
          this._Router.navigate(['/userdetails', user.id]);
        }
      });
    } else {
      this._UsersDataService.fetchUsers().subscribe((res) => {
        this.usersData = res.data;

        this.usersData.map((user: any) => {
          if (user.id === Number(this.userId)) {
            this._Router.navigate(['/userdetails', user.id]);
          }
        });
      });
    }
  }
}
