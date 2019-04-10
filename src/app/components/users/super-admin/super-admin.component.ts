import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { SuperAdminService } from 'src/app/services/super-admin/super-admin.service';
import { MatTableDataSource, MatSort,MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Convert, UserData, User } from "./user-data.model"
import {} from './user-data.model'


 
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  displayedColumns: string[] = ['firstName','lastName','email','loginMethod','lastLogin'];
  dataSource:any;
  Users:any[];

  public loggedIn:boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private Auth:Auth1Service,private router:Router,private Token:TokenService,
    private adminService:SuperAdminService) { 
      let token=this.Token.get();
      this.adminService.getAllUsers(token).subscribe((res: Response) => {
      const data = JSON.stringify(res);

        const Users=Convert.toUserData(data);
        this.Users=Users.Result.users;
        // console.log(Users.Result.users);
        this.dataSource =new MatTableDataSource(Users.Result.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
     
    }

    
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  logout(event:MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
