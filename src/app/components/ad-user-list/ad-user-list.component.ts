import { Component, OnInit } from '@angular/core';
import { AdUserService } from '../../services/ad-user.service';
import { AdUser } from '../../common/ad-user';
@Component({
  selector: 'app-ad-user-list',
  templateUrl: './ad-user-list.component.html',
  styleUrls: ['./ad-user-list.component.css']
})
export class AdUserListComponent implements OnInit {

  users: AdUser[];

  constructor(private adUserService: AdUserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  private listUsers() {
    // this.adUserService.getUserList().subscribe(
    //     data => {
    //       this.users = data;
    //     }
    // )
    let user = new AdUser();
    user.firstname = "Peggy";
    user.lastname = "Weiss";
    user.fullname = "Weiss, Peggy";
    user.description = "SG Bauordnung";
    user.office = "405";
    user.phone = "846";
    user.street = "Karl-Marx-Str. 32";
    user.floor = "2. Obergeschoss";
    user.postalCode = 29410;
    user.city = "Salzwedel";
    user.company = "Bauordnungsamt";
    user.department = "SG Bauordnun";
    user.position = "Bauordnung";

    let arr: AdUser[] = [];
    arr.push(user);

    this.users = arr;
  }
}
