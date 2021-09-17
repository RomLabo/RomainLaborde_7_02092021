import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() userName!: string;
  @Input() userFirstName!: string;
  @Input() clickedBouton: boolean = false;
  
  user!: any;

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.onGetProfile();
  }

  onGetProfile() {
    this.userService.getProfile().subscribe((response: Object) =>{
      this.user = response;
      this.userName = this.user.name;
      this.userFirstName = this.user.first_name;
    })
  }

  deleteClick() {
    this.clickedBouton = true;
  }

  giveUpDelete() {
    this.clickedBouton = false;
  }

  onDeleteProfile() {
    this.userService.deleteProfile();
  }

}
