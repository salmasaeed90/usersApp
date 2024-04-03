import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { __param } from 'tslib';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  id!: string | null;
  user!: any;
  constructor(
    private _UsersDataService: UsersDataService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });

    this.spinner.show();
    this._UsersDataService.userDetails(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.spinner.hide();
        this.user = res.data;
      },
    });
  }

  backToHome() {
    this._Router.navigate(['/users']);
  }
}
